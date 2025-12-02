"use client";

import React from "react";

export default function ProfileHeader({
  name,
  truckNameState,
  capacity,
  phone,
  setEditModal,
  setProfileLink,
  setTruckShareModal,
  earnings,
  pendingCOD,
  rating,
  setSosModal,
}) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
      <div className="flex gap-6 items-center">
        <div className="w-28 h-28 rounded-full ring-4 ring-[#efe6ff] bg-gray-200 overflow-hidden flex items-center justify-center">
          <span className="text-4xl text-gray-400">👤</span>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {truckNameState} · {capacity} kg
          </p>
          <p className="text-sm text-gray-500">{phone}</p>

          <div className="flex gap-3 mt-3 items-center">
            <button
              onClick={() => {
                setEditModal(true);
              }}
              className="px-4 py-2 rounded-lg bg-white text-indigo-600 border"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                const url =
                  typeof window !== "undefined" ? window.location.href : "";
                setProfileLink(url);
                setTruckShareModal(true);
              }}
              className="px-4 py-2 rounded-lg bg-white text-indigo-600 border"
            >
              Share
            </button>

            <button
              onClick={() => setSosModal && setSosModal(true)}
              className="px-3 py-2 rounded-full bg-red-50 text-red-600 border"
            >
              SOS
            </button>
          </div>
        </div>

        <div className="w-64 grid grid-cols-3 gap-4">
          <div className="bg-[#faf5ff] rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">Earnings</div>
            <div className="font-semibold text-lg">₹{earnings}</div>
          </div>

          <div className="bg-[#faf5ff] rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">COD Pending</div>
            <div className="font-semibold text-lg">₹{pendingCOD}</div>
          </div>

          <div className="bg-[#faf5ff] rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">Rating</div>
            <div className="font-semibold text-lg">{rating} ⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
}
