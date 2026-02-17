import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function analyzeUX(content: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a senior UX auditor.

Return valid JSON only.

Return:
- score (0-100)
- issues (array 8-12)

Each issue must include:
  - category (clarity, layout, navigation, accessibility, trust)
  - title
  - why
  - evidence
  - suggestion

Website Data:
${JSON.stringify(content)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}
