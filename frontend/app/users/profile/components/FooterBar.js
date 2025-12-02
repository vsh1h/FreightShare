"use client";

import React from "react";

export default function FooterBar({ setSosModal }) {
    return (
        <div className="mt-6 flex gap-3">
            <button
                onClick={() => setSosModal(true)}
                className="px-4 py-2 rounded-full bg-red-100 text-red-600"
            >
                SOS
            </button>
        </div>
    );
}
