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
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Permission to Drive (App)</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4">
          <div className="border rounded p-4 bg-gray-50">
            <h4 className="font-semibold">Permission Document</h4>
            <p className="text-sm text-gray-600 mt-2">
              This document authorizes the driver to operate vehicles for
              shipments assigned via the FreightShare app.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <strong>Driver:</strong> {name}
              </div>
              <div>
                <strong>Phone:</strong> {phone}
              </div>
              <div>
                <strong>Vehicle:</strong> {truckNameState} · {capacity} kg
              </div>
              <div>
                <strong>Issued by:</strong> FreightShare Admin
              </div>
              <div>
                <strong>Issued on:</strong> {new Date().toLocaleDateString()}
              </div>
              <div>
                <strong>Valid until:</strong>{" "}
                {new Date(
                  new Date().setMonth(new Date().getMonth() + 6)
                ).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                const content = `
                <html><head><title>Permission Document</title></head><body>
                  <h2>Permission to Drive — FreightShare</h2>
                  <p>This document authorizes the driver to operate vehicles for shipments assigned via the FreightShare app.</p>
                  <p><strong>Driver:</strong> ${name}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Vehicle:</strong> ${truckNameState} · ${capacity} kg</p>
                  <p><strong>Issued by:</strong> FreightShare Admin</p>
                  <p><strong>Issued on:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Valid until:</strong> ${new Date(
                    new Date().setMonth(new Date().getMonth() + 6)
                  ).toLocaleDateString()}</p>
                  <div style="margin-top:40px;">Signature: _____________________</div>
                </body></html>`;
                const w = window.open("", "_blank");
                if (w) {
                  w.document.write(content);
                  w.document.close();
                  w.focus();
                  w.print();
                }
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Print / Save as PDF
            </button>

            <button
              onClick={() => {
                const html = `<!doctype html><html><head><meta charset="utf-8"><title>Permission</title></head><body></body></html>`;
                const blob = new Blob([html], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `permission-${name.replace(/\s+/g, "_")}.html`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-white border rounded"
            >
              Download HTML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
