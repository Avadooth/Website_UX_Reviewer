export default function ReviewCard({ review }: any) {
    return (
      <div className="space-y-6">
        <div className="text-xl font-semibold">
          UX Score: {review.score}
        </div>
  
        {review.issues?.map((issue: any, i: number) => (
          <div key={i} className="border p-4 rounded">
            <h3 className="font-bold">{issue.title}</h3>
            <p className="text-sm text-gray-500">
              Category: {issue.category}
            </p>
            <p className="mt-2">{issue.why}</p>
            <p className="mt-2 text-sm italic">
              Evidence: {issue.evidence}
            </p>
            <p className="mt-2 text-green-600">
              Suggestion: {issue.suggestion}
            </p>
          </div>
        ))}
      </div>
    );
  }