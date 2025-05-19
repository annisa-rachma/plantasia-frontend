
import { Link, Outlet } from "react-router-dom";
import TableRowCategory from "../components/TableRowCategory";
import AddCategoryPopup from "../components/AddCategoryPopup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/actionCategory";

export default function Categories() {
    const [showAddCategory, setShowAddCategory] = useState(false)
    const categories = useSelector((state) => {
      return state.categoryReducer.categories
    })
    const dispatch = useDispatch()

    const fetchData = async () => {
      try {
        // setLoading(true)
        await dispatch(fetchCategories());
      } catch (error) {
        console.log(error);
      } 
      // finally {
      //   setLoading(false)
      // }
    };
    

    useEffect(() => {
      fetchData();
    }, []);

    const handleOnClose = () => setShowAddCategory(false)
// console.log(categories)
    return (
    <>
    {/* <Outlet/> */}
      <div className=" grid grid-cols-2 py-8 pl-4 mr-4">
        <div className="text-4xl font-semibold">Categories List</div>
        <div onClick={() => {setShowAddCategory(true)}} className="grid justify-items-end">
        
          <div className="border cursor-pointer grid place-content-center border-black py-1 px-5 bg-black text-white hover:bg-[#242424] hover:text-white">
            + Create Category
          </div>
        
        </div>
      </div>
      <div className="mt-8  p-8 pl-4 pr-0 mr-4 h-[480px]">
        <table className="border-t-[1px] border-black  w-[100%]">
          <thead>
            <tr className="text-left ">
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">NO</th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                NAME
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                CREATED AT
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                UPDATED AT
              </th>
              <th className=" py-3 px-4 border-b-[1px] border-slate-600">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, idx) => {
            return <TableRowCategory key={idx} category={category} idx={idx} />;
          })}
          </tbody>
        </table>
      </div>
      <AddCategoryPopup onClose={handleOnClose} visible={showAddCategory}/>
    </>
  );
}
