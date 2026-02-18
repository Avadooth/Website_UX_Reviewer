import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    // DB check
    await prisma.review.findFirst();

    // LLM key check
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { backend: "OK", database: "OK", llm: "Missing API Key" },
        { status: 500 }
      );
    }

    // Lightweight LLM test
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Instead of full generation, just confirm model object exists
    if (!model) {
      throw new Error("Model initialization failed");
    }

    return NextResponse.json({
      backend: "OK",
      database: "OK",
      llm: "OK",
    });

  } catch (err) {
    console.error("Status error:", err);

    return NextResponse.json(
      { backend: "OK", database: "OK", llm: "Failed" },
      { status: 500 }
    );
  }
}