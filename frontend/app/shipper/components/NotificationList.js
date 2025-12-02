"use client";

import { useState } from "react";
import NotificationItem from "./NotificationItem";

const initialNotifications = [
  {
    id: 1,
    title: "New customer has registered. Please follow up.",
    message: "A new customer has registered on the platform. Please follow up with them to provide assistance and ensure a smooth onboarding process. Contact details are available in the customer dashboard.",
    time: "Just now",
    isNew: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Special offer for customers! 20% discount.",
    message: "We have a special offer for customers: 20% discount on all shipments for the next week. Please promote this offer to increase sales and attract more business.",
    time: "30 min ago",
    isNew: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Reminder to achieve this month's sales target.",
    message: "This is a reminder to achieve this month's sales target. You are currently at 75% of the target. Please focus on closing pending deals and acquiring new customers.",
    time: "2 days ago",
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
