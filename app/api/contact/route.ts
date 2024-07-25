import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Simulate sending the message (e.g., store in a database, send an email, etc.)
    console.log("Received contact form submission:", { name, email, message });

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
