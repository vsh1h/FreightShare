"use client";

import React from "react";

export default function UploadDocsModal({
    show,
    onClose,
    files,
    handleFileChange,
    uploadMessage,
    uploading,
    handleUpload,
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Upload Documents</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleUpload} className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm text-gray-600">Driving License</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "license")}
                            className="w-full mt-1 border rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Vehicle RC</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "rc")}
                            className="w-full mt-1 border rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Insurance</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "insurance")}
                            className="w-full mt-1 border rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Permit</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "permit")}
                            className="w-full mt-1 border rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">PAN Card</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "pan")}
                            className="w-full mt-1 border rounded p-2 text-sm"
                        />
                    </div>

                    {uploadMessage && (
                        <div className="text-sm text-indigo-600">{uploadMessage}</div>
                    )}

                    <div className="flex gap-3 mt-4">
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
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
