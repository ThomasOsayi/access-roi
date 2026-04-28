import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.includes(process.env.ADMIN_PASSWORD!);
  } catch {
    return false;
  }
}

async function getCalendlyToken(): Promise<string | null> {
  // Check env var first as fallback
  if (process.env.CALENDLY_API_TOKEN) return process.env.CALENDLY_API_TOKEN;

  // Check Firestore
  try {
    const settingsDoc = await getDoc(doc(db, "settings", "calendly"));
    if (settingsDoc.exists()) {
      return settingsDoc.data().apiToken || null;
    }
  } catch (err) {
    console.error("Error reading Calendly token:", err);
  }
  return null;
}

async function calendlyFetch(endpoint: string, apiToken: string) {
  const res = await fetch(`https://api.calendly.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  return res.json();
}

// POST: Save the Calendly API token
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { apiToken } = body;

    if (!apiToken || apiToken.trim().length < 10) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    // Verify the token works by calling Calendly
    const testRes = await fetch("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${apiToken.trim()}`,
        "Content-Type": "application/json",
      },
    });

    if (!testRes.ok) {
      return NextResponse.json(
        { error: "Token is invalid. Check your Calendly API token and try again." },
        { status: 400 }
      );
    }

    // Save to Firestore
    await setDoc(doc(db, "settings", "calendly"), {
      apiToken: apiToken.trim(),
      connectedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save token error:", error);
    return NextResponse.json(
      { error: "Failed to save token" },
      { status: 500 }
    );
  }
}

// GET: Fetch session data
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const calendlyToken = await getCalendlyToken();

  if (!calendlyToken) {
    return NextResponse.json({
      connected: false,
      sessions: [],
      metrics: {
        totalBooked: 0,
        upcoming: 0,
        completed: 0,
        cancelled: 0,
        totalRevenue: 0,
        avgPerSession: 0,
      },
    });
  }

  try {
    const me = await calendlyFetch("/users/me", calendlyToken);
    if (!me) {
      return NextResponse.json({
        connected: false,
        error: "Invalid Calendly token",
        sessions: [],
        metrics: {
          totalBooked: 0,
          upcoming: 0,
          completed: 0,
          cancelled: 0,
          totalRevenue: 0,
          avgPerSession: 0,
        },
      });
    }

    const userUri = me.resource.uri;
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const upcomingData = await calendlyFetch(
      `/scheduled_events?user=${encodeURIComponent(userUri)}&min_start_time=${now.toISOString()}&status=active&sort=start_time:asc&count=25`,
      calendlyToken
    );

    const pastData = await calendlyFetch(
      `/scheduled_events?user=${encodeURIComponent(userUri)}&max_start_time=${now.toISOString()}&min_start_time=${threeMonthsAgo.toISOString()}&sort=start_time:desc&count=75`,
      calendlyToken
    );

    const upcomingEvents = upcomingData?.collection || [];
    const pastEvents = pastData?.collection || [];
    const allEvents = [...upcomingEvents, ...pastEvents];

    const sessions = await Promise.all(
      allEvents.map(async (event: {
        uri: string;
        name: string;
        start_time: string;
        end_time: string;
        status: string;
      }) => {
        const eventId = event.uri.split("/").pop();
        const inviteesData = await calendlyFetch(
          `/scheduled_events/${eventId}/invitees`,
          calendlyToken
        );

        const invitee = inviteesData?.collection?.[0];
        const startTime = new Date(event.start_time);
        const endTime = new Date(event.end_time);
        const durationMin = Math.round(
          (endTime.getTime() - startTime.getTime()) / 60000
        );

        const payment = invitee?.payment;
        const amount = payment?.amount
          ? parseFloat(payment.amount) / 100
          : 0;

        return {
          id: eventId,
          name: invitee?.name || "Unknown",
          email: invitee?.email || "—",
          date: startTime.toISOString(),
          time: startTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "America/Los_Angeles",
          }),
          duration: `${durationMin} min`,
          amount,
          status: event.status === "canceled"
            ? "cancelled"
            : startTime > now
              ? "upcoming"
              : "completed",
          eventName: event.name,
        };
      })
    );

    const completed = sessions.filter((s) => s.status === "completed").length;
    const upcoming = sessions.filter((s) => s.status === "upcoming").length;
    const cancelled = sessions.filter((s) => s.status === "cancelled").length;
    const totalRevenue = sessions.reduce((sum, s) => sum + s.amount, 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekSessions = sessions.filter(
      (s) => new Date(s.date) > oneWeekAgo && s.status !== "cancelled"
    ).length;
    const thisWeekRevenue = sessions
      .filter((s) => new Date(s.date) > oneWeekAgo && s.status !== "cancelled")
      .reduce((sum, s) => sum + s.amount, 0);

    const nextSession = sessions.find((s) => s.status === "upcoming");

    return NextResponse.json({
      connected: true,
      sessions,
      metrics: {
        totalBooked: sessions.length,
        upcoming,
        completed,
        cancelled,
        totalRevenue,
        avgPerSession:
          completed + upcoming > 0
            ? totalRevenue / (completed + upcoming)
            : 0,
        thisWeekSessions,
        thisWeekRevenue,
        nextSession: nextSession
          ? {
              name: nextSession.name,
              date: nextSession.date,
              time: nextSession.time,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Calendly fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Calendly data" },
      { status: 500 }
    );
  }
}