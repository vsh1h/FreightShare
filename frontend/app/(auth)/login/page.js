"use client";
import { useState } from "react";
import banner from "../../assets/freightshare-banner.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

export default function Page() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    // Simulate Google OAuth - In production, this would be actual OAuth
    const mockGoogleEmail = prompt("Enter your Google email (for testing):");

    if (!mockGoogleEmail) return;

    try {
      // Check if user exists in database
      const res = await api.post("/auth/check-user", {
        email: mockGoogleEmail,
      });

      if (res.data.exists) {
        // User exists, log them in
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);

          const userRole = res.data.user.role;
          if (userRole === "SHIPPER") {
            router.push("/users/dashboard");
          } else if (userRole === "CARRIER") {
            router.push("/shipper/dashboard");
          }
        }
      } else {
        // User doesn't exist, redirect to role selection for signup
        const userName = prompt("Enter your name (for testing):");
        if (userName) {
          localStorage.setItem("oauth_email", mockGoogleEmail);
          localStorage.setItem("oauth_name", userName);
          router.push("/role-selection");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Failed to authenticate with Google");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };

      const res = await api.post("/auth/login", data);
      console.log(res);
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        const userRole = res.data.users.role;

        if (userRole === "SHIPPER") {
          router.push("/users/dashboard");
        } else if (userRole === "CARRIER") {
          router.push("/shipper/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-purple-50">
      <div className="relative h-screen w-full hidden md:inline-block md:w-1/2">
        <Image
          src={banner}
          alt="leftSideImage"
          fill={true}
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-transparent">
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100/60 p-6 md:p-8 w-80 md:w-96">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <h2 className="text-4xl font-medium bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
                Log in
              </h2>
              <p className="text-sm text-indigo-700/80 mt-3">
                Welcome back! Please log in to continue
              </p>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full mt-8 border border-indigo-200 bg-white flex items-center justify-center h-12 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                  alt="googleLogo"
                  width={80}
                  height={80}
                />
              </button>

              <div className="flex items-center gap-4 w-full my-5">
                <div className="w-full h-px bg-indigo-100"></div>
                <p className="w-full text-nowrap text-sm text-indigo-700/80 text-center">
                  or login with email
                </p>
                <div className="w-full h-px bg-indigo-100"></div>
              </div>

              <div className="flex items-center w-full bg-transparent border border-indigo-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-indigo-900 placeholder-indigo-400 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center mt-6 w-full bg-transparent border border-indigo-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-indigo-900 placeholder-indigo-400 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-8 w-full h-12 rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition font-semibold shadow-md"
              >
                Login
              </button>

              <div className="w-full flex justify-center mt-8 text-indigo-700/80">
                <a className="text-sm text-indigo-600 hover:underline" href="#">
                  Forgot password?
                </a>
              </div>

              <p className="text-indigo-700 text-sm mt-4 text-center">
                Dont have an account?{" "}
                <a
                  className="text-indigo-700 font-medium underline"
                  href="/signup"
                >
                  Sign up{" "}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
