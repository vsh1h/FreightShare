"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function Filters({
  beginDate,
  endDate,
  status,
  onBeginDateChange,
  onEndDateChange,
  onStatusChange,
}) {
  const [begin, setBegin] = useState(beginDate || "");
  const [end, setEnd] = useState(endDate || "");

  // Create Request Form State
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");

  const handleBeginChange = (e) => {
    setBegin(e.target.value);
    onBeginDateChange(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
    onEndDateChange(e.target.value);
  };

  const handleCreateRequest = () => {
    if (!destination || !weight) {
      alert("Please fill in both Destination and Weight.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      pickup: "Current Location", // Default or add input if needed
      drop: destination,
      distance: Math.floor(Math.random() * 100) + 10, // Mock distance
      price: Math.floor(Math.random() * 5000) + 1000, // Mock price
      type: weight + " kg",
      date: new Date().toISOString().split('T')[0],
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem("freightRequests") || "[]");
    localStorage.setItem("freightRequests", JSON.stringify([newRequest, ...existingRequests]));

    alert("Request Created Successfully!");
    setDestination("");
    setWeight("");
  };

  return (
    <div className="w-full flex items-end gap-6 mt-4">

      {/* BEGIN DATE */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Begin Date
        </label>
        <div className="relative bg-gradient-to-r from-[#D9C6FF] to-[#BBAAFF] border-2 border-[#6C5FF5] rounded-2xl px-4 py-3 flex items-center w-56">
          <input
            type="date"
            value={begin}
            onChange={handleBeginChange}
            placeholder="dd/mm/yyyy"
            className="bg-transparent w-full text-white placeholder-white/80 outline-none cursor-pointer"
          />
          <Calendar className="w-5 h-5 text-purple-900 ml-2" />
        </div>
      </div>

      {/* END DATE */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <div className="relative bg-gradient-to-r from-[#D9C6FF] to-[#BBAAFF] border-2 border-[#6C5FF5] rounded-2xl px-4 py-3 flex items-center w-56">
          <input
            type="date"
            value={end}
            onChange={handleEndChange}
            placeholder="dd/mm/yyyy"
            className="bg-transparent w-full text-white placeholder-white/80 outline-none cursor-pointer"
          />
          <Calendar className="w-5 h-5 text-purple-900 ml-2" />
        </div>
      </div>

      {/* STATUS */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
        <div className="relative bg-gradient-to-r from-[#D9C6FF] to-[#BBAAFF] border-2 border-[#6C5FF5] rounded-2xl px-4 py-3 flex items-center w-56 cursor-pointer">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent appearance-none w-full text-white placeholder-white/80 outline-none cursor-pointer"
          >
            <option value="Any">Any</option>
            <option value="Completed">Completed</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
          </select>
          <ChevronDown className="w-5 h-5 text-purple-900 ml-2" />
        </div>
      </div>

      {/* CREATE REQUEST FORM (Replaces Client) */}
      <div className="flex items-end gap-2 flex-1">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City"
            className="border-2 border-[#6C5FF5] rounded-xl px-3 py-3 w-32 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Weight</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="kg"
            className="border-2 border-[#6C5FF5] rounded-xl px-3 py-3 w-24 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handleCreateRequest}
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-md h-[50px]"
        >
          Create New
        </button>
      </div>
    </div>
  );
}
