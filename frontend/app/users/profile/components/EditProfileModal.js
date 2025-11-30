"use client";

import React from "react";

export default function EditProfileModal({
    show,
    onClose,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    editTruckName,
    setEditTruckName,
    editCapacity,
    setEditCapacity,
    submitEdit,
}) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Edit Profile</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <form onSubmit={submitEdit} className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Truck Name</label>
                        <input
                            value={editTruckName}
                            onChange={(e) => setEditTruckName(e.target.value)}
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Capacity (kg)</label>
                        <input
                            type="number"
                            value={editCapacity}
                            onChange={(e) => setEditCapacity(Number(e.target.value))}
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-white border rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
