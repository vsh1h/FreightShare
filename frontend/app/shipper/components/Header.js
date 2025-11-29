"use client";

import ProfileIcon from "./ProfileIcon";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <ProfileIcon />
      </div>
    </header>
  );
}
