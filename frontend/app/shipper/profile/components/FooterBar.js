"use client";

import React from "react";

export default function FooterBar({ setSosModal }) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={() => setSosModal(true)}
        className="px-4 py-2 rounded-full bg-red-50 text-red-600"
      >
        SOS
      </button>
      {/* <button
        onClick={() => (window.location.href = "/shipper/dashboard")}
        className="px-4 py-2 rounded-full bg-indigo-600 text-white"
      >
        Go to Dashboard
      </button>
      <button
        onClick={() => (window.location.href = "/shipper/helpAndSupport")}
        className="px-4 py-2 rounded-full bg-indigo-600 text-white"
      >
        Help & Support
      </button> */}
    </div>
  );
}
