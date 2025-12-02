"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotificationsHeader from "../components/NotificationsHeader";
import NotificationTabs from "../components/NotificationTabs";
import NotificationList from "../components/NotificationList";
import SendNotificationForm from "../components/SendNotificationForm";

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sentNotifications, setSentNotifications] = useState([]);

  const handleSendNotification = (notification) => {
    setSentNotifications((prev) => [...prev, notification]);
  };

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <NotificationsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "send" ? (
          <SendNotificationForm onSend={handleSendNotification} />
        ) : (
          <NotificationList searchTerm={searchTerm} activeTab={activeTab} sentNotifications={sentNotifications} />
        )}
      </div>
    </div>
  );
}
