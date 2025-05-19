import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleDeleteCategory } from "../store/actions/actionCategory";
import { getParsedDate } from "../store/actions/parseDate";
import EditCategoryPopup from "./EditCategoryPopup";
import Swal from "sweetalert2";

export default function TableRowCategory({ category, idx }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const handleOnCloseEdit = () => setShowEdit(false);
  const dispatch = useDispatch();
  const handleShowEdit = () => {
    setShowEdit(true);
    setEditClicked(true);
  };

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
        dispatch(handleDeleteCategory(category.id));
        Swal.fire("Deleted!", "Your selected category has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <tr className="text-left ">
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {idx + 1}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {category.name}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {getParsedDate(category.createdAt)}
        </td>
        <td className=" py-3 px-4 border-b-[1px]  border-slate-300 ">
          {getParsedDate(category.updatedAt)}
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
      {editClicked && (
        <EditCategoryPopup
          onClose={handleOnCloseEdit}
          visible={showEdit}
          id={category.id}
        />
      )}
    </>
  );
}
