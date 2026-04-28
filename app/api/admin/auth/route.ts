import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function getAdminPassword(): Promise<string> {
  // Check Firestore first
  try {
    const settingsDoc = await getDoc(doc(db, "settings", "admin"));
    if (settingsDoc.exists() && settingsDoc.data().password) {
      return settingsDoc.data().password;
    }
  } catch (err) {
    console.error("Error reading admin password:", err);
  }
  // Fall back to env var
  return process.env.ADMIN_PASSWORD || "admin";
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const adminPassword = await getAdminPassword();
    return decoded.includes(adminPassword);
  } catch {
    return false;
  }
}

// POST: Login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    const adminPassword = await getAdminPassword();

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = Buffer.from(
      `accessroi:${Date.now()}:${adminPassword}`
    ).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// DELETE: Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ success: true });
}

// PUT: Change password
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;
    const adminPassword = await getAdminPassword();

    if (currentPassword !== adminPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Save to Firestore
    await setDoc(doc(db, "settings", "admin"), {
      password: newPassword,
      updatedAt: new Date().toISOString(),
    });

    // Re-set the cookie with new password
    const token = Buffer.from(
      `accessroi:${Date.now()}:${newPassword}`
    ).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}