"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Review = {
  id: string;
  url: string;
  score: number;
  createdAt: string;
};
export default function History() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Last 5 Reviews</h1>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Back
          </Link>
        </div>

        {reviews.length === 0 && (
          <div className="text-gray-500">No reviews yet.</div>
        )}

        {reviews.map((review) => (
          <div
            key={review?.id}
            className="bg-white border rounded-lg p-6 mb-6 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div className="font-semibold">{review.url}</div>
              <div className="text-lg font-bold">{review.score}/100</div>
            </div>

            <div className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
