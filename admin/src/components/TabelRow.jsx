import { useDispatch } from "react-redux";
import { handleDeleteProduct } from "../store/actions/actionProduct";
import ImagesPopup from "./ImagesPopup";
import { useState } from "react";
import EditProduct from "./EditProductPopup";
import Swal from "sweetalert2";

export default function TableRow({ product, idx }) {
  const dispatch = useDispatch();
  const [showImages, setShowImages] = useState(false);
  const [showClicked, setShowClicked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteProduct(product.id));
        Swal.fire("Deleted!", "Your selected product has been deleted.", "success");
      }
    });
  };
  const handleOnClose = () => setShowImages(false);
  const handleOnCloseEdit = () => setShowEdit(false);

  const handleShowImage = () => {
    setShowImages(true);
    setShowClicked(true);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
    setEditClicked(true);
  };
  return (
    <>
      <tr className="text-left ">
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {idx + 1}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {product.name}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {product.Category.name}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          ${product.price}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {product.User.email}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <img
            src={product.mainImg}
            className="object-cover h-[100px] w-[100px]"
          />
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <button
            type="button"
            onClick={handleShowImage}
            className="grid place-content-start"
          >
            <div className="border border-black py-1 px-3 bg-white text-black hover:bg-black hover:text-white">
              Show images
            </div>
          </button>
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          <div className="flex flex-row gap-4">
            <button
              onClick={handleShowEdit}
              type="button"
              className="grid place-content-start"
            >
              <div className="border border-black py-1 px-3 bg-white text-black hover:bg-black hover:text-white">
                Edit
              </div>
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="grid place-content-start"
            >
              <div className="border border-black py-1 px-3 bg-white text-black hover:bg-black hover:text-white">
                Delete
              </div>
            </button>
          </div>
        </td>
      </tr>
      {showClicked && (
        <ImagesPopup
          onClose={handleOnClose}
          visible={showImages}
          id={product.id}
        />
      )}
      {editClicked && (
        <EditProduct
          onClose={handleOnCloseEdit}
          visible={showEdit}
          id={product.id}
        />
      )}
    </>
  );
}
