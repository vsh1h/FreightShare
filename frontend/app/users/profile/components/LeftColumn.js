"use client";

import React from "react";
export default function LeftColumn({
  available,
  setAvailable,
  capacity,
  setCapacity,
  chartMode,
  setChartMode,
  chartInfo,
  months,
}) {
  const [orders] = React.useState(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: `ORD-${1000 + i}`,
      from: `Place ${i + 1}`,
      to: `Place ${i + 2}`,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      price: `₹${(1200 + (i % 10) * 200).toLocaleString()}`,
      status: i % 4 === 0 ? "Pending" : "Completed",
    }))
  );

  const [page, setPage] = React.useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(orders.length / pageSize);
  const [complaints, setComplaints] = React.useState([]);
  const [trackId, setTrackId] = React.useState("");

  function raiseComplaint(orderId) {
    const text = prompt("Describe your issue for " + orderId + ":");
    if (text) {
      setComplaints((c) => [
        { id: Date.now(), orderId, text, date: new Date().toLocaleString() },
        ...c,
      ]);
      alert("Complaint submitted");
    }
  }

  function handleTrack() {
    if (!trackId.trim()) return alert("Enter order id to track");
    alert("Tracking " + trackId + " (demo)");
  }

  return (
    <div className="col-span-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Past Orders / Schedules</h2>

          <div className="text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-[#fffaf6] rounded-lg">
            <div className="text-sm text-gray-600">Upcoming</div>
            <div className="font-semibold mt-2">
              {orders.filter((o) => o.status !== "Completed").length} scheduled
              pickups
            </div>
          </div>

          <div className="p-4 bg-[#f6fbff] rounded-lg">
            <div className="text-sm text-gray-600">Completed</div>
            <div className="font-semibold mt-2">
              {orders.filter((o) => o.status === "Completed").length} completed
              orders
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <input
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="Enter Order ID to track"
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={handleTrack}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Track
          </button>
        </div>

        <div className="mt-4 bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartMode("trips")}
                className={`px-3 py-1 rounded-md ${
                  chartMode === "trips"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Orders (month-wise)
              </button>
            </div>
            <div className="text-sm text-gray-500">Month view</div>
          </div>

          <div className="w-full h-48">
            <svg
              viewBox="0 0 600 160"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="gradArea" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={chartMode === "trips" ? "#efe6ff" : "#efe6ff"}
                    stopOpacity="0.7"
                  />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={chartInfo.area} fill="url(#gradArea)" />
              <path
                d={chartInfo.path}
                fill="none"
                stroke={chartMode === "trips" ? "#7c3aed" : "#7c3aed"}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {chartInfo.points.map((p, i) => (
                <circle
                  key={i}
                  cx={p[0]}
                  cy={p[1]}
                  r="3"
                  fill={chartMode === "trips" ? "#7c3aed" : "#7c3aed"}
                />
              ))}
            </svg>
          </div>

          <div className="mt-3 grid grid-cols-12 text-xs text-gray-500">
            {months.map((m) => (
              <div key={m} className="col-span-1 text-center">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Recent orders</div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-white border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-white border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-auto pr-2">
            <div className="space-y-3">
              {orders
                .slice((page - 1) * pageSize, page * pageSize)
                .map((t, i) => (
                  <div
                    key={t.id}
                    className="p-3 bg-white border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">
                        {t.from} → {t.to}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.date} · {t.price}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`font-medium ${
                          t.status === "Completed"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {t.status}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => raiseComplaint(t.id)}
                          className="px-3 py-1 bg-white border rounded text-sm"
                        >
                          Raise complaint
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {complaints.length > 0 && (
            <div className="mt-4 text-sm">
              <div className="font-medium mb-2">Complaints raised</div>
              <ul className="space-y-2 text-xs text-gray-600">
                {complaints.map((c) => (
                  <li key={c.id} className="border p-2 rounded">
                    {c.orderId} — {c.text}{" "}
                    <div className="text-gray-400 text-xs">{c.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// }
