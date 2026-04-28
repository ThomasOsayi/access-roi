import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, role, stage, interests } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "signups"), {
      firstName: firstName || "",
      lastName: lastName || "",
      email,
      role: role || "",
      stage: stage || "",
      interests: interests || [],
      source: body.source || "full-form",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 500 }
    );
  }
}