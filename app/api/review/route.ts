import { NextRequest, NextResponse } from "next/server";
import { fetchWebsite } from "@/lib/fetchWebsite";
import { parseContent } from "@/lib/parseContent";
import { analyzeUX } from "@/lib/llm";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    const html = await fetchWebsite(url);
    const structured = parseContent(html);
    const analysis = await analyzeUX(structured);

    const saved = await prisma.review.create({
      data: {
        url,
        score: analysis.score,
        result: analysis,
      },
    });

    return NextResponse.json(saved);
  } catch (err) {
    console.error("Error in review route:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
