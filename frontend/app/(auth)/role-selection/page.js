"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { api } from "../../../lib/api";

export default function RoleSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (email || name) {
      if (email) setUserEmail(email);
      if (name) setUserName(name);
    } else {
      const storedEmail = localStorage.getItem("oauth_email");
      const storedName = localStorage.getItem("oauth_name");
      if (storedEmail) setUserEmail(storedEmail);
      if (storedName) setUserName(storedName);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    if (!phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    if (!/^\+?[\d\s-()]+$/.test(phoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }

    if (!userEmail || !userName) {
      setError("User information missing. Please try logging in again.");
      return;
    }

    setLoading(true);

    try {
      const roleMapping = {
        shipper: "SHIPPER",
        driver: "CARRIER",
      };

      const data = {
        email: userEmail,
        name: userName,
        phone: phoneNumber,
        role: roleMapping[selectedRole],
      };

      const res = await api.post("/auth/oauth/complete", data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        localStorage.removeItem("oauth_email");
        localStorage.removeItem("oauth_name");

        if (selectedRole === "shipper") {
          router.push("/users/dashboard");
        } else if (selectedRole === "driver") {
          router.push("/shipper/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            FreightShare
          </h1>
          <p className="text-gray-600">Complete your profile</p>
          {userEmail && (
            <p className="text-sm text-gray-500 mt-2">
              Signing in as: <span className="font-medium">{userEmail}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your role
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole("shipper")}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "shipper"
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`text-4xl ${
                      selectedRole === "shipper" ? "scale-110" : ""
                    } transition-transform`}
                  >
                    📦
                  </div>
                  <span
                    className={`font-semibold ${
                      selectedRole === "shipper"
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    Shipper
                  </span>
                </div>
                {selectedRole === "shipper" && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("driver")}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "driver"
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`text-4xl ${
                      selectedRole === "driver" ? "scale-110" : ""
                    } transition-transform`}
                  >
                    🚛
                  </div>
                  <span
                    className={`font-semibold ${
                      selectedRole === "driver"
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    Driver
                  </span>
                </div>
                {selectedRole === "driver" && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Continue to Dashboard"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
