import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5 p-12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
