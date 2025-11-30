"use client";

import React from "react";

export default function QRModal({ show, qrSrc, onClose, downloadQr }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center">
        <img src={qrSrc} alt="QR" className="w-64 h-64 mx-auto" />

        <div className="flex gap-3 mt-4">
          <button
            onClick={downloadQr}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
