"use client";

import React, { useState } from "react";

export default function RightColumn({
  files,
  handleFileChange,
  setShowModal,
  earnings,
  pendingCOD,
  openQr,
  verificationStatus,
  setVerificationStatus,
  setUploadMessage,
  setPermissionModal,
  setToolsModal,
}) {
  const [activeTab, setActiveTab] = useState("track");
  const [orders] = useState([
    {
      id: "ORD-1001",
      status: "Pending",
      from: "Warehouse A",
      to: "My Address",
      driver: "Rahul",
      driverPhone: "+919876543210",
      amount: 450,
      scheduled: "2025-12-03 14:00",
      paymentType: "COD",
    },
    {
      id: "ORD-0999",
      status: "Delivered",
      from: "Warehouse B",
      to: "My Address",
      driver: "Aman",
      driverPhone: "+919812345678",
      amount: 780,
      scheduled: "2025-11-20 10:00",
      paymentType: "Prepaid",
    },
  ]);

  const [notifications] = useState([
    { id: 1, text: "Your order ORD-1001 is out for delivery" },
    { id: 2, text: "New promo: 10% off on prepaid orders" },
  ]);

  const [websiteRating, setWebsiteRating] = useState(0);
  const [driverRatings, setDriverRatings] = useState({});

  function contactDriver(phone) {
    // open dialer
    window.location.href = `tel:${phone}`;
  }

  function messageDriver(phone) {
    const message = prompt(
      "Enter message to send to driver (availability/time):",
      "I will be available at 5pm."
    );
    if (message) {
      // simple sms scheme
      window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
    }
  }

  function payOnline(orderId) {
    alert(`Redirecting to payment for ${orderId} (demo)`);
  }

  return (
    <div className="col-span-4 space-y-6">
      {/* Orders & Tracking */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Orders</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("track")}
              className={`px-2 py-1 rounded ${activeTab === "track"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
                }`}
            >
              Track
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-2 py-1 rounded ${activeTab === "past"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
                }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-2 py-1 rounded ${activeTab === "pending"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
                }`}
            >
              Pending
            </button>
          </div>
        </div>

        <div className="mt-3">
          {activeTab === "track" && (
            <div className="text-sm text-gray-600">
              Enter order id to track (demo)
            </div>
          )}

          {activeTab === "past" && (
            <div className="space-y-2 mt-2">
              {orders
                .filter((o) => o.status !== "Pending")
                .map((o) => (
                  <div
                    key={o.id}
                    className="p-3 border rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {o.id} • {o.from} → {o.to}
                      </div>
                      <div className="text-xs text-gray-500">
                        {o.scheduled} • ₹{o.amount}
                      </div>
                    </div>
                    <div className="text-sm text-emerald-600">{o.status}</div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "pending" && (
            <div className="space-y-2 mt-2">
              {orders
                .filter((o) => o.status === "Pending")
                .map((o) => (
                  <div key={o.id} className="p-3 border rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{o.id}</div>
                        <div className="text-xs text-gray-500">
                          {o.from} → {o.to} • {o.scheduled}
                        </div>
                      </div>
                      <div className="text-sm text-amber-600">{o.status}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => contactDriver(o.driverPhone)}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Call Driver
                      </button>
                      <button
                        onClick={() => messageDriver(o.driverPhone)}
                        className="flex-1 py-2 bg-white border rounded-lg"
                      >
                        Message Driver
                      </button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      {o.paymentType === "COD" ? (
                        <>
                          <button className="flex-1 py-2 bg-white border rounded-lg">
                            Cash on Delivery
                          </button>
                          <button
                            onClick={() => payOnline(o.id)}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
                          >
                            Pay Online
                          </button>
                        </>
                      ) : (
                        <div className="text-sm text-gray-600">Prepaid</div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>



      {/* Notifications */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="font-medium">Notifications</h4>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {notifications.map((n) => (
            <div key={n.id} className="border p-2 rounded">
              {n.text}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Verification / Documents */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="font-medium">Documents & Verification</h4>
        <ul className="mt-4 space-y-3">
          {["Aadhar Card", "Address Proof", "PAN"].map((d) => (
            <li key={d} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#fff0f7] text-pink-600 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div className="flex-1 text-sm">{d}</div>
              <button className="text-indigo-600 text-sm">View</button>
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 bg-green-600 text-white rounded-lg"
          >
            Submit Documents
          </button>
        </div>
      </div>

      {/* Tools / Toll Calculator */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
        <div className="text-sm font-medium">Tools/Calculator</div>
        <div className="text-xs text-gray-500 mt-2">
          Estimate route cost, tolls and ETA
        </div>
        <div className="mt-3">
          <button
            onClick={() => setToolsModal(true)}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Open Calculator
          </button>
        </div>
      </div>
    </div>


  );
}
