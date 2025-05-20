import Logo from "/logo.svg";
import { MdOutlineDashboardCustomize, MdOutlineHome } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");

  const handleLogout = () => {
    Swal.fire({
      title: "Ready to log out?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    // Use a switch statement or if-else if conditions to set currentPage based on pathname
    switch (location.pathname) {
      case "/":
        setCurrentPage("dashboard");
        break;
      case "/categories":
        setCurrentPage("categories");
        break;
      case "/register":
        setCurrentPage("register");
        break;
      default:
        setCurrentPage("/");
    }
  }, [location.pathname]);
  return (
    <>
      <aside className="h-full flex flex-col">
        <div className=" p-4 flex justify-end">
          <button onClick={onClose} className="text-black text-2xl font-bold">
            ✕
          </button>
        </div>
        <div className="left-0 m-auto top-0 w-full h-[100vh] flex flex-col bg-gray-200 border-r-[1px] border-black">
          <div className="mt-12">
            <img src={Logo} alt="logo" className="w-36 mx-auto " />
          </div>

          <div className="mt-8 flex flex-col justify-center ">
            <div
              className={`w-[100%] h-16 m-auto font-medium mt-4  hover:bg-black hover:text-white ${
                currentPage === "dashboard"
                  ? "bg-black text-white"
                  : "text-black"
              }`}
            >
              <Link to={`/`}>
                <div className="w-[85%] h-16 border-b-[1px] mx-auto border-black grid content-center">
                  <div className="flex-row flex ml-6">
                    <div>
                      <MdOutlineHome size="30px" />
                    </div>
                    <div className="ml-4 grid place-content-center">
                      Dashboard
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div
              className={`w-[100%] h-16 m-auto font-medium -mt-[1px]  hover:bg-black hover:text-white ${
                currentPage === "categories"
                  ? "bg-black text-white"
                  : "text-black"
              }`}
            >
              <Link to={`/categories`}>
                <div className="w-[85%] h-16 border-b-[1px] mx-auto border-black grid content-center">
                  <div className="flex-row flex ml-6">
                    <div>
                      <MdOutlineDashboardCustomize size="25px" />
                    </div>
                    <div className="ml-4 grid place-content-center">
                      Categories
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div
              className={`w-[100%] h-16 m-auto font-medium -mt-[1px]  hover:bg-black hover:text-white ${
                currentPage === "register"
                  ? "bg-black text-white"
                  : "text-black"
              }`}
            >
              <Link to={`/register`}>
                <div className="w-[85%] h-16 border-b-[1px] mx-auto border-black grid content-center">
                  <div className="flex-row flex ml-6">
                    <div>
                      <HiOutlineUserAdd size="25px" />
                    </div>
                    <div className="ml-4 grid place-content-center">
                      Register Admin
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-[100%] h-16 m-auto font-medium -mt-[1px] hover:bg-black hover:text-white ">
              <div
                onClick={handleLogout}
                className="w-[85%] h-16 border-b-[1px] mx-auto border-black grid content-center"
              >
                <div className="flex-row flex ml-6">
                  <div>
                    <RiLogoutBoxRLine size="24px" />
                  </div>
                  <div className="ml-4 grid place-content-center">Log out</div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </aside>
    </>
  );
}
