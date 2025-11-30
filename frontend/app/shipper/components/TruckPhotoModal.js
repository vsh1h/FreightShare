"use client";

import React from "react";

export default function TruckPhotoModal({
  show,
  onClose,
  tmpTruckPreview,
  truckPreview,
  handleTmpTruckChange,
  saveTruckPhoto,
}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Upload Truck Photo</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4">
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {tmpTruckPreview
                ? "Selected image"
                : truckPreview
                ? "Saved image"
                : "No image selected"}
            </span>
            <label className="px-3 py-2 bg-white border rounded cursor-pointer text-sm">
              Choose file
              <input
                type="file"
                accept="image/*"
                onChange={handleTmpTruckChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4">
            {(tmpTruckPreview || truckPreview) && (
              <>
                <div className="text-sm text-gray-600 mb-2">Truck photo</div>
                <img
                  src={tmpTruckPreview || truckPreview}
                  alt="truck preview"
                  className="w-48 h-32 object-cover rounded"
                />
              </>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-white border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={saveTruckPhoto}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
