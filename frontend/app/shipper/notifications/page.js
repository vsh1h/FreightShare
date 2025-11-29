"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NotificationsHeader from "../components/NotificationsHeader";
import NotificationTabs from "../components/NotificationTabs";
import NotificationList from "../components/NotificationList";

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <NotificationsHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <NotificationList searchTerm={searchTerm} activeTab={activeTab} />
      </div>
    </div>
  );
}
