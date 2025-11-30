"use client";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-800">
          FreightShare
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Shipments
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Profile
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Settings
          </a>
        </div>
      </nav>

      {/* Search Bar below navbar */}
      <div className="w-full bg-white shadow-sm px-6 py-3">
        <input
          type="search"
          placeholder="Search..."
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </>
  );
}
