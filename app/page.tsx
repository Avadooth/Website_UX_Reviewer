"use client";
import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ReviewCard from "@/components/ReviewCard";

export default function Home() {
  const [review, setReview] = useState<any>(null);

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Website UX Reviewer
      </h1>

      <UrlForm setReview={setReview} />

      {review && <ReviewCard review={review} />}
    </main>
  );
}