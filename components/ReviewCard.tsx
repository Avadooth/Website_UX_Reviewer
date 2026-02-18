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

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const grouped = review.issues.reduce<Record<string, Issue[]>>(
    (acc, issue) => {
      if (!acc[issue.category]) acc[issue.category] = [];
      acc[issue.category].push(issue);
      return acc;
    },
    {}
  );

  const scoreColor =
    review.score >= 80
      ? "text-green-600"
      : review.score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  const priorityColor = (priority: number) => {
    if (priority >= 8) return "bg-red-100 text-red-700";
    if (priority >= 5) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };
  return (
    <>
      <div>
        {/* ===== SCORE SECTION ===== */}
        <div className="mb-14 text-center">
          <div className="text-sm text-gray-500 mb-2">Overall UX Score</div>

          <div className={`text-6xl font-bold ${scoreColor}`}>
            {review.score}
            <span className="text-xl text-gray-400">/100</span>
          </div>
        </div>

        {/* ===== GROUPED ISSUES ===== */}
        {Object.entries(grouped).map(([category, issues]) => (
          <div key={category} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold capitalize">{category}</h2>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {issues.length} issues
              </span>
            </div>

            {issues.map((issue, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition"
              >
                {/* Title + Priority */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{issue.title}</h3>

                  {issue.priority && (
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${priorityColor(
                        issue.priority
                      )}`}
                    >
                      Priority {issue.priority}
                    </span>
                  )}
                </div>

                {/* Why */}
                <p className="text-gray-700 mb-4">{issue.why}</p>

                {/* Evidence */}
                <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600">
                  <span className="font-semibold">Evidence:</span>{" "}
                  {issue.evidence}
                </div>

                {/* Before / After */}
                {issue.before && issue.after && (
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                      <div className="text-xs font-semibold text-red-600 mb-2 uppercase tracking-wide">
                        Before
                      </div>
                      <div className="text-sm text-gray-700">
                        {issue.before}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                      <div className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">
                        After
                      </div>
                      <div className="text-sm text-gray-700">{issue.after}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
