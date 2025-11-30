"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function Filters({
  beginDate,
  endDate,
  status,
  client,
  onBeginDateChange,
  onEndDateChange,
  onStatusChange,
  onClientChange,
}) {
  const [begin, setBegin] = useState(beginDate || "");
  const [end, setEnd] = useState(endDate || "");

  const handleBeginChange = (e) => {
    setBegin(e.target.value);
    onBeginDateChange(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
    onEndDateChange(e.target.value);
  };

  return (
    <div className="w-full flex items-end gap-6 mt-4">

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

      {/* CLIENT */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Client</label>
        <div className="relative bg-gradient-to-r from-[#D9C6FF] to-[#BBAAFF] border-2 border-[#6C5FF5] rounded-2xl px-4 py-3 flex items-center w-56 cursor-pointer">
          <select
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            className="bg-transparent appearance-none w-full text-white placeholder-white/80 outline-none cursor-pointer"
          >
            <option value="Any">Any</option>
            {/* Map actual clients here if needed */}
          </select>
          <ChevronDown className="w-5 h-5 text-purple-900 ml-2" />
        </div>
      </div>
    </div>
  );
}
