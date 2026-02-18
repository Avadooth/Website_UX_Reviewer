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

    const res = await model.generateContent("Say OK");
    console.log("res", res);
    return NextResponse.json({
      backend: "OK",
      database: "OK",
      llm: "OK",
    });
  } catch (err) {
    console.error("Status LLM error:", err);
    return NextResponse.json(
      { backend: "OK", database: "OK", llm: "Failed" },
      { status: 500 }
    );
  }
}
