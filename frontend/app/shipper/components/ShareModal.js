"use client";

import React from "react";

export default function ShareModal({ show, onClose, profileLink }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Share Profile</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Shareable profile link</p>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              readOnly
              value={profileLink}
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(profileLink);
                  alert("Link copied to clipboard");
                } catch (e) {
                  alert("Copy failed");
                }
              }}
              className="px-3 py-2 bg-indigo-600 text-white rounded"
            >
              Copy
            </button>
          </div>

          <div className="mt-3">
            <button
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: "My FreightShare profile",
                      url: profileLink,
                    });
                  } catch (e) {}
                } else {
                  try {
                    await navigator.clipboard.writeText(profileLink);
                    alert("Web Share not available — link copied");
                  } catch (e) {
                    alert("Share not available");
                  }
                }
              }}
              className="mt-2 w-full py-2 bg-white border rounded text-sm"
            >
              Share via device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
