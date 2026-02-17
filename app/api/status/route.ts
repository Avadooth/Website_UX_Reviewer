import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await prisma.review.findFirst();
    return NextResponse.json({
      backend: "OK",
      database: "OK",
      llm: process.env.OPENAI_API_KEY ? "Configured" : "Missing",
    });
  } catch {
    return NextResponse.json(
      { status: "Error" },
      { status: 500 }
    );
  }
}