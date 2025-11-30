"use client";

import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css'

const Map = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

export default function Page() {
  return (
    <>
    <div >
    <Map
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </Map>
    </div>
    <section className="bg-purple-200 py-16 px-6">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-bold text-gray-800">Sign Up</h2>
                    <p className="text-gray-600">
                        Sign up for FreightShare to our account and we help you maintain account, ensure, accounting tech and rusbustion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="flex-1 px-6 py-3 rounded-full border-2 border-purple-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                        />
                        <button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-md">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">
                        
                    </p>
                </div>
    </section>
    </>

  );
}