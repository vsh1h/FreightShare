

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Home, HelpCircle, Truck } from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", icon: Home, href: "/shipper/dashboard" },
  { label: "Profile", icon: User, href: "/shipper/profile" },
  { label: "Notifications", icon: Bell, href: "/shipper/notifications" },
  { label: "Help-Support", icon: HelpCircle, href: "/shipper/help" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Normalize paths
  const normalizePath = (path) =>
    path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

  const normalizedPathname = normalizePath(pathname);

  const sidebarWidthClass = isHovered ? "w-64" : "w-16";

  return (
<div
  className={"bg-indigo-700 text-white h-[160vh] p-6 flex flex-col gap-6 transition-width duration-300 ease-in-out " + sidebarWidthClass}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
      {/* Brand section */}
      <div className="flex items-center space-x-2">
        <Truck className="w-6 h-6 text-white" />
        {isHovered && (
          <span className="text-xl font-bold text-white">
            Freight<span className="text-purple-300">Share</span>
          </span>
        )}
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-4 mt-6">
        {sidebarItems.map(({ label, icon: Icon, href }) => {
          const normalizedHref = normalizePath(href);
          const isActive = normalizedPathname === normalizedHref;

          const baseClasses =
            "flex items-center gap-3 text-xl font-medium cursor-pointer border-l-4 transition-colors transition-transform duration-200";
          const activeClasses =
            "border-white bg-[#7C7FE0] hover:border-white hover:bg-[#7C7FE0] hover:rounded-full hover:scale-105 hover:shadow-md";
          const inactiveClasses =
            "border-transparent hover:border-white hover:bg-[#7C7FE0] hover:rounded-full hover:scale-105 hover:shadow-md";

          const linkClasses = isActive
            ? `${baseClasses} ${activeClasses}`
            : `${baseClasses} ${inactiveClasses}`;

          return (
            <Link key={label} href={href} className={linkClasses}>
              <Icon size={28} />
              {isHovered && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

