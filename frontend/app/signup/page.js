"use client";
import { useState } from "react";
import banner from "../assets/freightshare-banner.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {api} from '../../lib/api'

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("SHIPPER");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      name:name,
      phone:phone,
      password:password,
      email:email,
      role:role
    }
    try{
      const res = await api.post('/auth/signup', data)
      console.log(res.token)
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
        router.push('/login')
      }
      
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7ff] flex w-full">
      <div className="relative h-screen hidden md:block md:w-1/2">
        <Image
          src={banner}
          alt="leftSideImage"
          fill={true}
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-transparent">
        <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100/60 p-6 md:p-8 w-80 md:w-96">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-4xl font-medium bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
              Sign up
            </h2>
            <p className="text-sm text-indigo-700/80 mt-3">
              Welcome back! Please sign up to continue
            </p>

            <button
              type="button"
              className="w-full mt-8 border border-indigo-200 bg-white flex items-center justify-center h-12 rounded-full shadow-sm"
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
                or sign up with email
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-2.761 4.477-4 8-4s8 1.239 8 4v1H4v-1z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-indigo-900 placeholder-indigo-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-indigo-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.28-.09-.58-.03-.78.17l-2.2 2.2c-3.1-1.6-5.6-4.1-7.2-7.2l2.2-2.2c.2-.2.26-.5.17-.78C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent text-indigo-900 placeholder-indigo-400 outline-none text-sm w-full h-full"
                pattern="[0-9+\-() ]{7,20}"
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
            <div className="w-full mt-6">
              <label className="text-sm text-indigo-800">Sign up as:</label>
              <select
                className="w-full mt-2 border border-indigo-100 rounded-full h-10 px-4 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option className="text-indigo-900" value="SHIPPER">
                  Shipper
                </option>
                <option className="text-indigo-900" value="CARRIER">
                  Driver
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
            >
              Sign up
            </button>
            <p className="text-indigo-700 text-sm mt-4 text-center">
              Already have an account?{" "}
              <a
                className="text-indigo-700 font-medium underline"
                href="/login"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
