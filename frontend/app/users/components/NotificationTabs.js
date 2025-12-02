export default function NotificationTabs({ activeTab, onTabChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex gap-6 text-lg font-medium">
        <button
          onClick={() => onTabChange("all")}
          className={`pb-2 ${
            activeTab === "all"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600"
          }`}
        >
          All
        </button>

        <button
          onClick={() => onTabChange("archive")}
          className={`pb-2 ${
            activeTab === "archive"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600"
          }`}
        >
          Archive
        </button>

        <button
          onClick={() => onTabChange("favorite")}
          className={`pb-2 ${
            activeTab === "favorite"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600"
          }`}
        >
          Favorite
        </button>

        <button
          onClick={() => onTabChange("send")}
          className={`pb-2 ${
            activeTab === "send"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600"
          }`}
        >
          Send
        </button>

        <button
          onClick={() => onTabChange("sent")}
          className={`pb-2 ${
            activeTab === "sent"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600"
          }`}
        >
          Sent
        </button>
      </div>
    </div>
  );
}
