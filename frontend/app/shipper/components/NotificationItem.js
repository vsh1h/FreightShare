import { Star, Trash2, RotateCcw, Bell } from "lucide-react";

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      part
    )
  );
};

export default function NotificationItem({
  id,
  title,
  time,
  isFavorite,
  isNew,
  isDeletedTab = false,
  searchTerm = "",
  onDelete,
  onFavorite,
  onUndo,
}) {
  return (
    <div className="flex items-center justify-between bg-white hover:bg-indigo-100 transition p-4 rounded-lg border border-indigo-100 shadow-sm">
      <div className="flex items-start gap-4">
        
        {/* New message dot */}
        {isNew && <span className="w-3 h-3 bg-indigo-600 rounded-full mt-2"></span>}

        {/* Icon */}
        <Bell className="text-indigo-600 mt-1" />

        {/* Message */}
        <div>
          <p className="font-medium text-gray-800">{highlightText(title, searchTerm)}</p>
          <p className="text-gray-500 text-sm">{time}</p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex gap-4">

        {/* ⭐ Favorite */}
        <div onClick={() => onFavorite(id)} className="cursor-pointer">
          <Star className={isFavorite ? "text-yellow-500" : "text-gray-400"} />
        </div>

        {/* 🗑 Delete OR ↩ Undo */}
        {isDeletedTab ? (
          <RotateCcw
            className="text-green-600 cursor-pointer"
            onClick={() => onUndo(id)}
          />
        ) : (
          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(id)}
          />
        )}
      </div>
    </div>
  );
}
