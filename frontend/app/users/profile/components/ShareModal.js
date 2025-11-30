"use client";

import React from "react";

export default function ShareModal({ show, onClose, profileLink }) {
    if (!show) return null;

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(profileLink);
            alert("Link copied to clipboard!");
        } catch (e) {
            alert("Failed to copy link");
        }
    }

    async function handleShare() {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My FreightShare Profile",
                    text: "Check out my profile",
                    url: profileLink,
                });
            } else {
                handleCopy();
            }
        } catch (e) {
            // ignore
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Share Profile</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="p-3 bg-gray-100 rounded border break-all text-sm">
                        {profileLink}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex-1 px-4 py-2 bg-white border rounded-lg"
                        >
                            Copy Link
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
