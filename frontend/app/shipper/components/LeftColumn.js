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
  recentTrips,
  tripsPage,
  setTripsPage,
  tripsPageSize,
  tripsTotalPages,
}) {
  return (
    <div className="col-span-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Availability</h2>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Go Online</span>
              <button
                onClick={() => setAvailable(!available)}
                className={`w-14 h-7 rounded-full p-1 
                      ${available ? "bg-indigo-600" : "bg-gray-300"}`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transform
                        ${available ? "translate-x-7" : "translate-x-0"}`}
                />
              </button>
            </label>

            <label className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Capacity (kg)</span>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-28 border rounded-lg p-2 text-right"
              />
            </label>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Status:{" "}
          <span className={available ? "text-green-600" : "text-red-600"}>
            {available ? "Online and accepting jobs" : "Offline"}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Past History / Schedules</h3>
          <div className="text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-[#fffaf6] rounded-lg">
              <div className="text-sm text-gray-600">Upcoming</div>
              <div className="font-semibold mt-2">2 scheduled trips</div>
            </div>

            <div className="p-4 bg-[#f6fbff] rounded-lg">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="font-semibold mt-2">138 completed trips</div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
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
                  Trips (month-wise)
                </button>
                <button
                  onClick={() => setChartMode("rating")}
                  className={`px-3 py-1 rounded-md ${
                    chartMode === "rating"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Rating
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
                      stopColor={chartMode === "trips" ? "#c7f9d9" : "#efe6ff"}
                      stopOpacity="0.7"
                    />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={chartInfo.area} fill="url(#gradArea)" />
                <path
                  d={chartInfo.path}
                  fill="none"
                  stroke={chartMode === "trips" ? "#059669" : "#7c3aed"}
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
                    fill={chartMode === "trips" ? "#059669" : "#7c3aed"}
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
            <div className="text-sm text-gray-600 mb-2">Recent trips</div>

            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                Showing page {tripsPage} of {tripsTotalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTripsPage((p) => Math.max(1, p - 1))}
                  disabled={tripsPage === 1}
                  className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setTripsPage((p) => Math.min(tripsTotalPages, p + 1))
                  }
                  disabled={tripsPage === tripsTotalPages}
                  className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-auto pr-2">
              <div className="space-y-3">
                {recentTrips
                  .slice(
                    (tripsPage - 1) * tripsPageSize,
                    tripsPage * tripsPageSize
                  )
                  .map((t, i) => (
                    <div
                      key={i + (tripsPage - 1) * tripsPageSize}
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
                      <div className="text-green-600">Completed</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
