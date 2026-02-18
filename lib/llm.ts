import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function analyzeUX(content: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a senior UX auditor evaluating a live website.

Your task:
Analyze the structured website content and generate a professional UX audit.

Strict Requirements:
- Return valid JSON only.
- Do NOT wrap output in markdown.
- Do NOT include explanations outside JSON.
- Do NOT hallucinate content that is not present in the provided data.
- Evidence must reference exact extracted text.

Return JSON in this exact structure:

{
  "score": number (0-100),
  "issues": [
    {
      "priority": number (1-10, where 10 = most critical),
      "category": "clarity | layout | navigation | accessibility | trust",
      "title": "short issue title",
      "why": "concise explanation (2-3 sentences max)",
      "evidence": "exact text snippet from provided data",
      "suggestion": "clear actionable improvement",
      "before": "current problematic version (only for top 3 priority issues)",
      "after": "improved version suggestion (only for top 3 priority issues)"
    }
  ]
}

Rules:
- Generate 8 to 12 issues.
- Ensure issues are grouped across multiple categories.
- Top 3 highest priority issues MUST include before and after.
- Lower priority issues must NOT include before/after.
- Keep explanations concise and practical.
- Avoid generic UX advice.
- Focus on real usability impact.

Website Data:
${JSON.stringify(content)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid JSON from Gemini");
  }

  return JSON.parse(jsonMatch[0]);
}
