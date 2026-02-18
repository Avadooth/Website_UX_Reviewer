import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    await prisma.review.findFirst();

    // LLM Check
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    await model.generateContent("Say OK");
    return NextResponse.json({
      backend: "OK",
      database: "OK",
      llm: "OK",
    });
  } catch {
    return NextResponse.json(
      { backend: "OK", database: "OK", llm: "Failed" },
      { status: 500 }
    );
  }
}
