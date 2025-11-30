export default function NotificationsHeader({ searchTerm, onSearchChange }) {
    return (
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-indigo-700">
          List Notification
        </h2>

        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-indigo-200 rounded-lg px-4 py-2 w-60 focus:outline-none focus:border-indigo-500"
        />
      </div>
    );
  }
  