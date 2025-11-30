"use client";

import React from "react";

export default function QRModal({ show, qrSrc, onClose, downloadQr }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">QR Code</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <img src={qrSrc} alt="QR code" className="w-64 h-64" />

                    <button
                        onClick={downloadQr}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Download QR
                    </button>
                </div>
            </div>
        </div>
    );
}
