import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

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

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const signupsRef = collection(db, "signups");
    const q = query(signupsRef, orderBy("createdAt", "desc"), limit(200));
    const snapshot = await getDocs(q);

    const signups = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        role: data.role || "",
        stage: data.stage || "",
        interests: data.interests || [],
        source: data.source || "full-form",
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      };
    });

    const totalSignups = signups.length;

    // This week's signups
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekSignups = signups.filter(
      (s) => s.createdAt && new Date(s.createdAt) > oneWeekAgo
    ).length;

    // Breakdown by source
    const fromFullForm = signups.filter((s) => s.source === "full-form").length;
    const fromQuickSignup = signups.filter(
      (s) => s.source === "quick-signup"
    ).length;

    // Breakdown by role
    const byRole: Record<string, number> = {};
    signups.forEach((s) => {
      if (s.role) {
        byRole[s.role] = (byRole[s.role] || 0) + 1;
      }
    });

    // Breakdown by interest
    const byInterest: Record<string, number> = {};
    signups.forEach((s) => {
      if (s.interests && Array.isArray(s.interests)) {
        s.interests.forEach((interest: string) => {
          byInterest[interest] = (byInterest[interest] || 0) + 1;
        });
      }
    });

    return NextResponse.json({
      signups,
      metrics: {
        totalSignups,
        thisWeekSignups,
        fromFullForm,
        fromQuickSignup,
        byRole,
        byInterest,
      },
    });
  } catch (error) {
    console.error("Signups fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch signups" },
      { status: 500 }
    );
  }
}