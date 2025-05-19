import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCategory } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function AddCategoryPopup({ visible, onClose }) {
  const [input, setInput] = useState({
    name: "",
  });
  const dispatch = useDispatch();

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
      await dispatch(handleAddCategory(input));
      setInput({
        name: "",
      });
      toast.success("Successfully added a new category", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onClose();
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

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
        <div className="bg-white p-6 w-[500px]">
        <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-center text-xl text-black">
              Add New Category
            </h1>
            <div className="">
              <LiaWindowCloseSolid onClick={onClose} size="25px" className="cursor-pointer hover:bg-slate-100"/>
            </div>

          </div>

          <form onSubmit={handleSubmit} id="form-login" className="">
            <div className="flex flex-col mt-2">
              <label className="text-black text-md ">Name</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="Input name..."
                className="w-[100%] h-10 pl-4 mt-1 bg-white border border-black text-black text-md"
              />
            </div>

            <div className="w-[100%] grid grid-cols-2 mt-2 gap-2">
              <button
                onClick={onClose}
                type="button"
                className="h-10 mt-6  bg-white text-md text-black border border-black grid content-center hover:bg-black hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-10 mt-6  bg-black text-md text-white border border-black grid content-center hover:bg-[#1b1b1b] hover:text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
