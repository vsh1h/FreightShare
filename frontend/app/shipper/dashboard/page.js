import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TripCard from "../components/TripCard";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";
import Filters from "../components/Filters";
import StatCircle from "../components/StatCircle";





const incomingRequests = [
  {
    id: 1,
    pickup: "Kirti Nagar",
    drop: "Gurugram",
    distance: 65,
    price: 3200,
    type: "Pallet",
    date: "2025-11-23",
  },
  {
    id: 2,
    pickup: "Noida",
    drop: "Ghaziabad",
    distance: 25,
    price: 1500,
    type: "Container",
    date: "2025-11-25",
  }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-[rgba(237,200,255,0.2)] to-transparent min-h-screen">
        <Header />

        <div className="p-6 flex space-x-6">
          <div className="flex-1 space-y-6">
            <Quote />
            <Filters />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Total Trips */}
            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Total Trips</p>
                <h2 className="text-3xl font-bold">124</h2>
              </div>
              <StatCircle value={63} />  {/* Example % */}
            </div>

            {/* Km Driven */}
            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Km Driven</p>
                <h2 className="text-3xl font-bold">87,421 km</h2>
              </div>
              <StatCircle value={45} /> 
            </div>

            {/* Fuel Efficiency */}
            <div className="bg-white p-6 shadow rounded-xl flex justify-between items-center hover:border-2 hover:border-indigo-500 hover:scale-105 transition duration-300 ease-in-out">
              <div>
                <p className="text-gray-500">Fuel Efficiency</p>
                <h2 className="text-3xl font-bold">7.8 km/l</h2>
              </div>
              <StatCircle value={78} />
            </div>

          </div>


            {/* Trips List */}
            <div className="bg-white p-6 shadow rounded-xl space-y-4">
              <h3 className="text-xl font-semibold">Recent Trips</h3>

              <TripCard
                route="Dallas → Phoenix"
                status="Completed"
                date="21 Nov 2025"
              />

              <TripCard
                route="Austin → Denver"
                status="In Transit"
                date="23 Nov 2025"
              />

              <TripCard
                route="Houston → Chicago"
                status="Pending"
                date="25 Nov 2025"
              />
            </div>
          </div>

          <Calendar incomingRequests={incomingRequests} />
        </div>
      </div>
    </div>
  );
}
