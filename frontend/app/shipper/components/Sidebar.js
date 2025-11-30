"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Home, HelpCircle, Truck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", icon: Home, href: "/shipper/dashboard" },
  { label: "Profile", icon: User, href: "/shipper/profile" },
  { label: "Notifications", icon: Bell, href: "/shipper/notifications" },
  { label: "Help-Support", icon: HelpCircle, href: "/shipper/helpAndSupport" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch (e) {
      // ignore
    }
    router.push("/");
  };

  const normalizePath = (path) =>
    path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

  const normalizedPathname = normalizePath(pathname);

  const sidebarWidthClass = isHovered ? "w-64" : "w-16";

  return (
    <>
      {/* Fixed sidebar so it sits flush with viewport top/bottom; spacer keeps layout flow */}
      <div
        className={
          "fixed top-0 left-0 bg-indigo-700 text-white h-screen pt-4 pb-0 px-3 flex flex-col gap-6 transition-width duration-300 ease-in-out z-50 " +
          sidebarWidthClass
        }
        style={{ willChange: "width" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-2">
          <Truck
            className={`text-white transition-all duration-200 ${
              isHovered ? "w-12 h-12" : "w-10 h-10"
            }`}
          />
          {isHovered && (
            <span className="text-xl font-bold text-white">
              Freight<span className="text-purple-300">Share</span>
            </span>
          )}
        </div>

        <nav className="flex flex-col gap-4 mt-6">
          {sidebarItems.map(({ label, icon: Icon, href }) => {
            const normalizedHref = href ? normalizePath(href) : "";
            const isActive =
              normalizedHref && normalizedPathname === normalizedHref;

            const baseClasses =
              "flex items-center gap-2 text-lg font-medium cursor-pointer border-l-4 transition-colors transition-transform duration-200 px-1";
            const activeClasses =
              "border-white bg-[#7C7FE0] hover:border-white hover:bg-[#7C7FE0] hover:rounded-full hover:scale-105 hover:shadow-md";
            const inactiveClasses =
              "border-transparent hover:border-white hover:bg-[#7C7FE0] hover:rounded-full hover:scale-105 hover:shadow-md";

            const itemClasses = isActive
              ? `${baseClasses} ${activeClasses}`
              : `${baseClasses} ${inactiveClasses}`;

            return (
              <Link key={label} href={href} className={itemClasses}>
                <Icon
                  className={`transition-transform duration-200 ${
                    isHovered ? "scale-120" : "scale-100"
                  }`}
                  size={isHovered ? 34 : 28}
                />
                {isHovered && (
                  <span className="whitespace-nowrap">{label}</span>
                )}
              </Link>
            );
          })}
        </nav>
        {/* logout button placed at bottom */}
        <div className="mt-auto w-full pb-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isHovered ? "justify-start gap-2 px-1" : "justify-center"
            } text-lg font-medium cursor-pointer border-l-4 border-transparent hover:border-white hover:bg-[#7C7FE0] hover:rounded-full hover:scale-105 hover:shadow-md py-2`}
          >
            <LogOut
              className={`transition-transform duration-200 ${
                isHovered ? "scale-120" : "scale-100"
              }`}
              size={isHovered ? 34 : 24}
            />
            {isHovered && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>

      {/* Spacer to keep the page content from sliding under the fixed sidebar */}
      <div
        className={`${sidebarWidthClass} flex-shrink-0`}
        aria-hidden="true"
      />
    </>
  );
}
