import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../store/actions/actionUser";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(handleLogin(input));
      toast.info("Signing in, please wait...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="w-full mx-auto h-[100vh] grid grid-cols-2">
        <div className=" grid col-span-1  place-content-center">
          <div className="text-black text-4xl font-semibold">Login</div>

          <form id="form-login" onSubmit={handleSubmit} className="w-1/2 mt-8">
            <div className="flex flex-col mt-2">
              <label className="text-black text-lg ">Email address*</label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your email..."
                className="w-96 h-12 pl-4 mt-1 bg-white border border-black text-black text-lg"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-black text-lg">Password*</label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-96 h-12 pl-4 mt-1 bg-white border border-black text-black text-lg"
              />
            </div>
            <div className="text-black text-md mt-3 flex flex-row justify-between w-96">
              <div className="flex flex-row">
                <div className="bg-white border border-black w-[16px] h-[16px] my-auto hover:bg-black p-1"></div>
                <div className="ml-2">Remember me</div>
              </div>
              <div>
                <a href="">
                  <div className="hover:underline">Lost your password?</div>
                </a>
              </div>
            </div>
            <div className="w-96 h-12 mt-6 bg-white text-xl text-black border border-black grid content-center hover:bg-black hover:text-white">
              <button type="submit" className="">
                Log In
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-1 overflow-hidden grid place-content-center">
          <img
            src="https://www.kinfolk.com/wp-content/uploads/2023/07/Lease_on_Life.jpg"
            alt=""
            className="object-cover mb-60"
          />
        </div>
      </div>
    </>
  );
}
