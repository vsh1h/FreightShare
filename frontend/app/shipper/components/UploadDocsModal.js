"use client";

import React from "react";

export default function UploadDocsModal({
  show,
  onClose,
  truckPreview,
  files,
  handleFileChange,
  uploadMessage,
  uploading,
  handleUpload,
  setTruckModal,
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Upload Documents</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleUpload} className="mt-5 space-y-4">
          {truckPreview && (
            <div className="mb-3">
              <div className="text-sm text-gray-600">Truck photo</div>
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={truckPreview}
                  alt="truck"
                  className="w-28 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setTruckModal(true)}
                  className="px-3 py-2 bg-white border rounded"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Driving License", "license"],
              ["Vehicle RC", "rc"],
              ["Insurance", "insurance"],
              ["Permit", "permit"],
              ["PAN", "pan"],
            ].map(([label, key]) => (
              <label key={key} className="flex flex-col relative">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="mt-2 border rounded-lg p-3 bg-white flex justify-between items-center">
                  <span className="text-sm text-gray-500 truncate">
                    {files[key]?.name || "No file selected"}
                  </span>
                  <span className="text-xs text-indigo-600">Select</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, key)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </label>
            ))}
          </div>

          {uploadMessage && (
            <div className="text-sm text-red-600">{uploadMessage}</div>
          )}

          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-white border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
