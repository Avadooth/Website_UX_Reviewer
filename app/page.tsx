"use client";
import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import Link from "next/link";

import ReviewCard from "@/components/ReviewCard";

type Issue = {
  title: string;
  why: string;
  evidence: string;
  category: string;
  priority?: number;
  before?: string;
  after?: string;
};

type Review = {
  id: string;
  url: string;
  score: number;
  createdAt: string;
  issues: Issue[];
};

export default function Home() {
  const [review, setReview] = useState<Review | null>(null);

  return (
    <main className="p-10 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white border-b">
        <h1 className="text-xl font-semibold">Website UX Reviewer</h1>

        <div className="flex gap-4">
          <Link
            href="/status"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Status
          </Link>
          <Link
            href="/history"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            History
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Audit any website’s UX in seconds
        </h2>

        <p className="text-gray-600 mb-10">
          Paste a URL. We analyze clarity, layout, navigation, accessibility and
          trust — with evidence and improvement suggestions.
        </p>

        <UrlForm setReview={setReview} />
      </section>

      {/* Results */}
      {review && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <ReviewCard review={review} />
        </section>
      )}
    </main>
  );
}
