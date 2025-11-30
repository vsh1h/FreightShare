import { Star, StarOff, Trash2, RotateCcw, Bell } from "lucide-react";

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
        
        {isNew && <span className="w-3 h-3 bg-indigo-600 rounded-full mt-2"></span>}

        <Bell className="text-indigo-600 mt-1" />

        <div>
          <p className="font-medium text-gray-800">{highlightText(title, searchTerm)}</p>
          <p className="text-gray-500 text-sm">{time}</p>
        </div>
      </div>

      <div className="flex gap-4">

        <div onClick={() => onFavorite(id)} className="cursor-pointer">
          {isFavorite ? (
            <Star className="text-yellow-500" />
          ) : (
            <StarOff className="text-gray-400" />
          )}
        </div>

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
