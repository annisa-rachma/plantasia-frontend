import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative">
      <div className="p-4 flex justify-between items-center border-b border-gray-300">
        <GiHamburgerMenu
          size={28}
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <div
        className={`
          fixed top-0 left-0 h-full z-50 bg-gray-200 border-r border-black w-64
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className=" p-4 md:p-12">
        <Outlet />
      </div>
    </div>
  );
}
