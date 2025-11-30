"use client";

import { useState } from "react";
import Image from "next/image";


// import { useState } from "react";
// import Image from "next/image";

export default function ProfileCard({ loading = false }) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={`rounded-2xl p-6 flex items-center justify-between gap-6 ${
        loading
          ? "animate-pulse bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 opacity-70 bg-opacity-30 backdrop-blur-md shadow-lg"
          : "bg-white bg-opacity-50 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold flex items-center gap-4">
          John Carter
          <button
            onClick={toggleInfo}
            className="text-sm text-blue-600 underline focus:outline-none"
            aria-expanded={showInfo}
            aria-controls="additional-info"
          >
            {showInfo ? "Hide Info" : "Show Info"}
          </button>
        </h3>
        <p className="text-gray-600 mb-3">Truck Driver — ID #TRK2931</p>

        {showInfo && (
          <div id="additional-info" className="text-sm text-gray-700 space-y-1">
            <p>Location: Texas, USA</p>
            <p>Experience: 6 Years</p>
            <p>Phone: +1 202 555 0192</p>
          </div>
        )}
      </div>

      <div style={{ position: "relative", width: "64px", height: "64px" }}>
        <Image src="/profile.png" alt="Profile icon" fill={true} sizes="64px" />
      </div>
    </div>
  );
}
