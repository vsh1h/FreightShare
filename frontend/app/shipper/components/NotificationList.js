"use client";

import { useState } from "react";
import NotificationItem from "./NotificationItem";

const initialNotifications = [
  {
    id: 1,
    title: "New customer has registered. Please follow up.",
    time: "Just now",
    isNew: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Special offer for customers! 20% discount.",
    time: "30 min ago",
    isNew: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Reminder to achieve this month's sales target.",
    time: "2 days ago",
    isNew: false,
    isFavorite: false,
  },
];

export default function NotificationList({ activeTab = "all", searchTerm = "" }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [deleted, setDeleted] = useState([]);

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

  let list;
  if (activeTab === "all") {
    list = notifications;
  } else if (activeTab === "favorite") {
    list = notifications.filter((n) => n.isFavorite);
  } else if (activeTab === "archive") {
    list = deleted;
  } else {
    list = notifications;
  }

  if (searchTerm) {
    list = list.filter((n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
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
        />
      ))}
    </div>
  );
}
