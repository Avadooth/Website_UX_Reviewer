import { useState } from "react";

export default function UrlForm({ setReview }: any) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!url) return alert("Enter URL");

    setLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setReview(data.result);
    setLoading(false);
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="border p-2 w-full rounded"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-black text-white px-4 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}