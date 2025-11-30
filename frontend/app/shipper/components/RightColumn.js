"use client";

import React from "react";

export default function RightColumn({
  files,
  handleFileChange,
  truckPreview,
  setShowModal,
  earnings,
  pendingCOD,
  openQr,
  verificationStatus,
  setVerificationStatus,
  setUploadMessage,
  setPermissionModal,
  setToolsModal,
}) {
  return (
    <div className="col-span-4 space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="font-medium">Documents</h4>

        <ul className="mt-4 space-y-3">
          {["Driving License", "Vehicle RC", "Insurance", "Permit", "PAN"].map(
            (d) => (
              <li key={d} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#fff0f7] text-pink-600 rounded-lg flex items-center justify-center">
                  📄
                </div>
                <div className="flex-1 text-sm">{d}</div>
                <button className="text-indigo-600 text-sm">View</button>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Wallet</h4>
          <div>₹{earnings}</div>
        </div>

        <div className="text-sm text-gray-600 mt-3">
          Pending COD: ₹{pendingCOD}
        </div>

        <div className="mt-3 flex gap-3">
          <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg">
            Withdraw
          </button>

          <button
            onClick={openQr}
            className="flex-1 py-2 bg-white border rounded-lg"
          >
            Share QR
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-sm font-medium">Admin Verification</div>

        <p className="text-xs text-gray-400 mt-1">
          Required for receiving high-value shipments.
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg"
          >
            Submit for Verification
          </button>

          <button
            onClick={() => {
              setVerificationStatus("verified");
              setUploadMessage("Verified by admin.");
            }}
            className="py-2 px-3 bg-white border text-sm rounded-lg"
          >
            Simulate Verify
          </button>
        </div>

        {verificationStatus === "pending" && (
          <div className="mt-2 text-sm text-yellow-600">
            Verification pending
          </div>
        )}
        {verificationStatus === "verified" && (
          <div className="mt-2 text-sm text-green-600">Verified by admin</div>
        )}

        {verificationStatus === "verified" && (
          <button
            onClick={() => setPermissionModal(true)}
            className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg"
          >
            Generate Permission Document
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
        <div className="text-sm font-medium">Tools/Calculator</div>
        <div className="text-xs text-gray-500 mt-2">
          Estimate route cost and tolls cost and estimate time of arrival cost
        </div>
        <div className="mt-3">
          <button
            onClick={() => setToolsModal(true)}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Open Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
