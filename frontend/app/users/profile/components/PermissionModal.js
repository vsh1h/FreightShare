"use client";

import React from "react";

export default function PermissionModal({
    show,
    onClose,
    name,
    phone,
    truckNameState,
    capacity,
}) {
    if (!show) return null;

    function handleGeneratePermission() {
        const permissionText = `FreightShare Permission Document\n\nDriver: ${name}\nPhone: ${phone}\nVehicle: ${truckNameState}\nCapacity: ${capacity} kg\n\nThis driver is verified and authorized to operate on the FreightShare platform.\n\nGenerated: ${new Date().toLocaleString()}`;

        const blob = new Blob([permissionText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "freightshare-permission.txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Permission Document</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-600">
                        Generate a permission document with your verified details.
                    </p>

                    <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        <div>
                            <span className="font-medium">Driver:</span> {name}
                        </div>
                        <div>
                            <span className="font-medium">Phone:</span> {phone}
                        </div>
                        <div>
                            <span className="font-medium">Vehicle:</span> {truckNameState}
                        </div>
                        <div>
                            <span className="font-medium">Capacity:</span> {capacity} kg
                        </div>
                    </div>

                    <button
                        onClick={handleGeneratePermission}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Generate & Download
                    </button>
                </div>
            </div>
        </div>
    );
}
