"use client";

import { useState } from "react";
import NotificationItem from "./NotificationItem";

const initialNotifications = [
  {
    id: 1,
    title: "New load available in your area.",
    message: "A new load is available in your area. Please check the details and accept if interested. The load is from New York to California, weight 5000 lbs, pickup date tomorrow.",
    time: "Just now",
    isNew: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Your trip has been confirmed.",
    message: "Your trip has been confirmed. Please prepare for pickup at the designated location. Driver details will be shared shortly. Safe travels!",
    time: "1 hour ago",
    isNew: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Payment received for load #12345.",
    message: "Payment of $1500 has been received for load #12345. The funds will be credited to your account within 24 hours. Thank you for using FreightShare.",
    time: "2 days ago",
    isNew: false,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Driver rating updated.",
    message: "Your driver rating has been updated to 4.8 stars based on recent feedback. Keep up the good work! Check your profile for more details.",
    time: "1 week ago",
    isNew: false,
    isFavorite: false,
  },
];

export default function NotificationList({ activeTab = "all", searchTerm = "", sentNotifications = [] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [deleted, setDeleted] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleFavorite = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
      )
    );
  };

  const handleDelete = (id) => {
    const removed = notifications.find((n) => n.id === id);
    setDeleted((prev) => [...prev, removed]);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUndo = (id) => {
    const restore = deleted.find((n) => n.id === id);
    setNotifications((prev) => [...prev, restore]);
    setDeleted((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  let list;
  if (activeTab === "all") {
    list = notifications;
  } else if (activeTab === "favorite") {
    list = notifications.filter((n) => n.isFavorite);
  } else if (activeTab === "archive") {
    list = deleted;
  } else if (activeTab === "sent") {
    list = sentNotifications;
  } else {
    list = notifications;
  }

  if (searchTerm) {
    list = list.filter((n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <div className="space-y-4 mt-4">
        {list.map((n) => (
          <NotificationItem
            key={n.id}
            id={n.id}
            title={n.title}
            time={n.time}
            isNew={n.isNew}
            isFavorite={n.isFavorite}
            isDeletedTab={activeTab === "archive"}
            searchTerm={searchTerm}
            onDelete={handleDelete}
            onUndo={handleUndo}
            onFavorite={handleFavorite}
            onClick={() => handleNotificationClick(n)}
          />
        ))}
      </div>

      {selectedNotification && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white p-10 rounded-lg max-w-2xl w-full mx-4 shadow-lg border border-indigo-100">
            <h3 className="text-2xl font-semibold mb-6">{selectedNotification.title}</h3>
            <p className="text-gray-600 mb-8">{selectedNotification.message}</p>
            <p className="text-sm text-gray-500 mb-6">{selectedNotification.time}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-indigo-600 text-white px-8 py-4 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
