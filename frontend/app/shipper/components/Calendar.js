"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";

export default function Calendar({ incomingRequests }) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // Default filter options
  const defaultDistanceOptions = ["5", "10", "20", "50"];
  const defaultPriceOptions = ["500", "1000", "2000", "5000"];
  const defaultRangeMinOptions = ["0", "5", "10", "20"];
  const defaultRangeMaxOptions = ["5", "10", "20", "50"];
  const defaultTypeOptions = ["fragile", "heavy", "standard"];

  // Filters state
  const [filters, setFilters] = useState({
    distance: "",
    price: "",
    rangeMin: "",
    rangeMax: "",
    type: "",
  });

  // Dynamic filter options state for user additions
  const [distanceOptions, setDistanceOptions] = useState(defaultDistanceOptions);
  const [priceOptions, setPriceOptions] = useState(defaultPriceOptions);
  const [rangeMinOptions, setRangeMinOptions] = useState(defaultRangeMinOptions);
  const [rangeMaxOptions, setRangeMaxOptions] = useState(defaultRangeMaxOptions);
  const [typeOptions, setTypeOptions] = useState(defaultTypeOptions);

  // New option input states
  const [newDistance, setNewDistance] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newRangeMin, setNewRangeMin] = useState("");
  const [newRangeMax, setNewRangeMax] = useState("");
  const [newType, setNewType] = useState("");

  // Setup panelRef and calculate requestsHeight
  const panelRef = useRef(null);
  const [requestsHeight, setRequestsHeight] = useState(null);

  useEffect(() => {
    function updateHeight() {
      if (panelRef.current) {
        const parentHeight =
          panelRef.current.parentElement?.clientHeight || window.innerHeight;
        const offsetHeight = panelRef.current.previousSibling
          ? panelRef.current.previousSibling.clientHeight
          : 0;
        // Calculate max available height for requests container to extend fully down
        const height = parentHeight - offsetHeight - 40; // extra padding adjustment
        setRequestsHeight(height);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Handle filters change
  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Handlers for new option input changes
  const onNewDistanceChange = (e) => setNewDistance(e.target.value);
  const onNewPriceChange = (e) => setNewPrice(e.target.value);
  const onNewRangeMinChange = (e) => setNewRangeMin(e.target.value);
  const onNewRangeMaxChange = (e) => setNewRangeMax(e.target.value);
  const onNewTypeChange = (e) => setNewType(e.target.value);

  // Add new option functions for each filter
  const addDistanceOption = () => {
    if (newDistance && !distanceOptions.includes(newDistance)) {
      setDistanceOptions((prev) => [...prev, newDistance].map(Number).sort((a, b) => a - b).map(String));
      setNewDistance("");
    }
  };
  const addPriceOption = () => {
    if (newPrice && !priceOptions.includes(newPrice)) {
      setPriceOptions((prev) => [...prev, newPrice].map(Number).sort((a, b) => a - b).map(String));
      setNewPrice("");
    }
  };
  const addRangeMinOption = () => {
    if (newRangeMin && !rangeMinOptions.includes(newRangeMin)) {
      setRangeMinOptions((prev) => [...prev, newRangeMin].map(Number).sort((a, b) => a - b).map(String));
      setNewRangeMin("");
    }
  };
  const addRangeMaxOption = () => {
    if (newRangeMax && !rangeMaxOptions.includes(newRangeMax)) {
      setRangeMaxOptions((prev) => [...prev, newRangeMax].map(Number).sort((a, b) => a - b).map(String));
      setNewRangeMax("");
    }
  };
  const addTypeOption = () => {
    if (newType && !typeOptions.includes(newType)) {
      setTypeOptions((prev) => [...prev, newType].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })));
      setNewType("");
    }
  };


  // Get number of days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the first day's index (Mon–Sun)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  // Disable past dates function
  function isPastDate(day) {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  // Handle date click only if not past
  const onDateClick = (day) => {
    if (!isPastDate(day)) {
      setSelectedDate(day);
    }
  };

  // Filter incoming Requests by selected date and filters
  const filteredRequests = useMemo(() => {
    if (!selectedDate || !incomingRequests) return [];

    const selectedDateStr = new Date(currentYear, currentMonth, selectedDate)
      .toISOString()
      .split("T")[0];

    // Convert filter values to numbers for comparison
    const distanceFilter = filters.distance ? Number(filters.distance) : null;
    const priceFilter = filters.price ? Number(filters.price) : null;
    const rangeMinFilter = filters.rangeMin ? Number(filters.rangeMin) : null;
    const rangeMaxFilter = filters.rangeMax ? Number(filters.rangeMax) : null;

    return incomingRequests.filter((req) => {
      // Check date match
      if (req.date !== selectedDateStr) return false;

      // Filter by Distance
      if (distanceFilter !== null && req.distance > distanceFilter) return false;

      // Filter by Price
      if (priceFilter !== null && req.price > priceFilter) return false;

      // Filter by Range Min and Max
      if (rangeMinFilter !== null && req.distance < rangeMinFilter) return false;
      if (rangeMaxFilter !== null && req.distance > rangeMaxFilter) return false;

      // Filter by Type
      if (filters.type && filters.type !== req.type) return false;

      return true;
    });
  }, [selectedDate, currentMonth, currentYear, incomingRequests, filters]);

  return (
    <div className="w-[400px] bg-white shadow-lg border-l min-h-[1200px] flex flex-col">

      <div className="w-full bg-gray-100 py-3 px-4 shadow flex items-center justify-center">
        <h2 className="font-semibold text-lg ">Calendar & Trips </h2>
      </div>
      <br></br>

      <div className="bg-gray-50 rounded-xl shadow p-4 mx-4 mb-2 flex flex-col flex-1">

        <div className="flex justify-between items-center mb-3">
          <button onClick={prevMonth} className="text-xl">◀</button>
          <h2 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={nextMonth} className="text-xl">▶</button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4 select-none">

          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day) => (
            <div key={day} className="text-center font-medium text-gray-600">{day}</div>
          ))}

          {[...Array(offset)].map((_, i) => (
            <div key={"empty" + i} />
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const past = isPastDate(day);
            const selected = selectedDate === day;
            return (
              <button
                key={day}
                onClick={() => onDateClick(day)}
                disabled={past}
                className={
                  "h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200 " +
                  (past ? "text-gray-400 cursor-not-allowed" : "text-gray-800 ") +
                  (selected ? "bg-indigo-600 text-white" : "hover:bg-indigo-100")
                }
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <span className="inline-block px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold select-none cursor-default">
            Filters
          </span>
        </div>


        {/* Filters dropdowns and add option inputs */}
        <div className="mt-0 grid grid-cols-1 gap-3 mb-4">

          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Max Distance (km)</label>
            <div className="flex gap-2 items-center">
              <select
                id="distance"
                name="distance"
                value={filters.distance}
                onChange={onFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Any</option>
                {distanceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt} km</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Add km"
                value={newDistance}
                onChange={onNewDistanceChange}
                className="mt-1 rounded-md border-gray-300 border p-1 w-20 text-sm"
              />
              <button onClick={addDistanceOption} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price (₹)</label>
            <div className="flex gap-2 items-center">
              <select
                id="price"
                name="price"
                value={filters.price}
                onChange={onFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Any</option>
                {priceOptions.map((opt) => (
                  <option key={opt} value={opt}>₹{opt}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Add ₹"
                value={newPrice}
                onChange={onNewPriceChange}
                className="mt-1 rounded-md border-gray-300 border p-1 w-20 text-sm"
              />
              <button onClick={addPriceOption} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="rangeMin" className="block text-sm font-medium text-gray-700">Min Distance (km)</label>
            <div className="flex gap-2 items-center">
              <select
                id="rangeMin"
                name="rangeMin"
                value={filters.rangeMin}
                onChange={onFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">No Min</option>
                {rangeMinOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt} km</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Add km"
                value={newRangeMin}
                onChange={onNewRangeMinChange}
                className="mt-1 rounded-md border-gray-300 border p-1 w-20 text-sm"
              />
              <button onClick={addRangeMinOption} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="rangeMax" className="block text-sm font-medium text-gray-700">Max Distance (km)</label>
            <div className="flex gap-2 items-center">
              <select
                id="rangeMax"
                name="rangeMax"
                value={filters.rangeMax}
                onChange={onFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">No Max</option>
                {rangeMaxOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt} km</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Add km"
                value={newRangeMax}
                onChange={onNewRangeMaxChange}
                className="mt-1 rounded-md border-gray-300 border p-1 w-20 text-sm"
              />
              <button onClick={addRangeMaxOption} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <div className="flex gap-2 items-center">
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={onFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">All</option>
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt[0].toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add type"
                value={newType}
                onChange={onNewTypeChange}
                className="mt-1 rounded-md border-gray-300 border p-1 w-32 text-sm"
              />
              <button onClick={addTypeOption} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">
                +
              </button>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-sm flex flex-col flex-1 overflow-auto"
          style={{ maxHeight: requestsHeight ? `${requestsHeight}px` : "none" }}
          ref={panelRef}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="inline-block px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold select-none cursor-default">
              Incoming Requests
            </h3>
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 && (
              <p className="text-gray-500 text-sm">No incoming requests for selected date.</p>
            )}
            {filteredRequests.map((req) => (
              <div key={req.id} className="p-4 bg-[#fbf8ff] border rounded-lg">
                <div className="font-semibold">
                  Pickup: {req.pickup} → Drop: {req.drop}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Distance: {req.distance} km · Price: ₹{req.price} · Type: {req.type}
                </div>

                <div className="flex gap-3 mt-3">
                  <button className="px-3 py-2 bg-green-600 text-white rounded-lg">
                    Accept
                  </button>
                  <button className="px-3 py-2 bg-white border rounded-lg">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

