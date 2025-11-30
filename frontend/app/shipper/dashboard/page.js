'use client';

import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TripCard from "../components/TripCard";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";
import Filters from "../components/Filters";
import StatCircle from "../components/StatCircle";
import { getDriverStats, getAvailableLoads, getActiveLoads } from "../../../lib/api";

const driverId = 1; // Assuming driver ID is 1 for demo; in real app, get from auth

export default function Dashboard() {
  const [stats, setStats] = useState({ totalTrips: 0, completedTrips: 0, activeTrips: 0 });
  const [availableLoads, setAvailableLoads] = useState([]);
  const [activeLoads, setActiveLoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, loadsData, activeData] = await Promise.all([
          getDriverStats(driverId),
          getAvailableLoads(),
          getActiveLoads(driverId)
        ]);
        setStats(statsData);
        setAvailableLoads(loadsData);
        setActiveLoads(activeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[rgba(237,200,255,0.2)] to-transparent min-h-screen">
        <Header />

        <div className="p-6 flex space-x-6">
          <div className="flex-1 space-y-6">
            <Quote />
            <Filters />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Total Trips</p>
                <h2 className="text-3xl font-bold">{stats.totalTrips}</h2>
              </div>
              <StatCircle value={Math.round((stats.completedTrips / stats.totalTrips) * 100) || 0} />
            </div>

            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Active Trips</p>
                <h2 className="text-3xl font-bold">{stats.activeTrips}</h2>
              </div>
              <StatCircle value={50} />
            </div>

            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Completed Trips</p>
                <h2 className="text-3xl font-bold">{stats.completedTrips}</h2>
              </div>
              <StatCircle value={Math.round((stats.completedTrips / stats.totalTrips) * 100) || 0} />
            </div>

          </div>

            <div className="bg-white p-6 shadow rounded-xl space-y-4">
              <h3 className="text-xl font-semibold">Recent Trips</h3>
              {activeLoads.length > 0 ? (
                activeLoads.slice(0, 3).map((load) => (
                  <TripCard
                    key={load.id}
                    route={`${load.pickupLocation} → ${load.dropLocation}`}
                    status={load.status === 'ACCEPTED' ? 'In Transit' : load.status}
                    date={new Date(load.createdAt).toLocaleDateString()}
                  />
                ))
              ) : (
                <p className="text-gray-500">No active trips</p>
              )}
            </div>
          </div>

          <Calendar incomingRequests={availableLoads} />
        </div>
      </div>
    </div>
  );
}
