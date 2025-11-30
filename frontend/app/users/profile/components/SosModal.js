"use client";

import React from "react";

export default function SosModal({
    sosContacts,
    onClose,
    handleCall,
    handleSms,
    handleShareMessage,
    handleCopyMessage,
    sosSending,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Emergency / SOS</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-600">
                        Use the options below to call, SMS or share an emergency message
                        with your current location (if available).
                    </p>

                    <div className="space-y-2">
                        {sosContacts.map((c) => (
                            <div
                                key={c.phone}
                                className="flex items-center justify-between p-2 border rounded"
                            >
                                <div>
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-500">{c.phone}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleCall(c.phone)}
                                        className="px-3 py-1 bg-green-600 text-white rounded"
                                    >
                                        Call
                                    </button>
                                    <button
                                        onClick={() => handleSms(c.phone)}
                                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded"
                                    >
                                        SMS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleShareMessage}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded"
                        >
                            Share Message
                        </button>
                        <button
                            onClick={handleCopyMessage}
                            className="flex-1 px-3 py-2 bg-white border rounded"
                        >
                            Copy Message
                        </button>
                    </div>

                    {sosSending && (
                        <div className="text-sm text-gray-500">Preparing message...</div>
                    )}
                </div>
            </div>
        </div>
    );
}
