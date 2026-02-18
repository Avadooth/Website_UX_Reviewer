# Website UX Reviewer

## How to Run

1. Clone repo
2. npm install
3. Add .env.local
4. npx prisma generate
5. npx prisma db push
6. npm run dev

## Environment Variables

DATABASE_URL=
GEMINI_API_KEY=

## What is Done

- URL parsing
- Gemini UX analysis
- Score
- Evidence
- Before/After suggestions
- History
- Status page

## What is Not Done

- Screenshot-based evidence
- Deep crawl
- Authentication

## Future Improvements

- Compare two URLs
- Export PDF
- Screenshot capture