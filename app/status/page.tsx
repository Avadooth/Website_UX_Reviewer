"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Status = {
  backend: string;
  database: string;
  llm: string;
};
export default function Status() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  if (!status) {
    return <div className="p-10">Checking system health...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">System Status</h1>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Back
          </Link>
        </div>

        <div className="space-y-4">
          <StatusRow label="Backend" value={status.backend} />
          <StatusRow label="Database" value={status.database} />
          <StatusRow label="LLM" value={status.llm} />
        </div>
      </div>
    </div>
  );
}

type StatusRowProps = {
  label: string;
  value: string;
};

function StatusRow({ label, value }: StatusRowProps) {
  const isOk = value === "OK";

  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <span className="font-medium">{label}</span>
      <span
        className={`text-sm font-semibold ${
          isOk ? "text-green-600" : "text-red-600"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
