"use client";

import { useState } from "react";

export default function SendNotificationForm({ onSend }) {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data
    console.log("Sending notification to driver:", selectedDriver, "Message:", message);
    // Add to sent notifications
    const sentNotification = {
      id: Date.now(), 
      title: `Notification sent to ${selectedDriver}: ${message}`,
      time: "Just now",
      isNew: false,
      isFavorite: false,
    };
    onSend(sentNotification);
    // Reset form
    setSelectedDriver("");
    setMessage("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">Send Notification to Driver</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">
            Select Driver
          </label>
          <select
            id="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="border border-indigo-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Choose a driver...</option>
            <option value="driver1">Driver 1</option>
            <option value="driver2">Driver 2</option>
            <option value="driver3">Driver 3</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="border border-indigo-200 rounded-lg px-4 py-2 w-full h-32 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
}
