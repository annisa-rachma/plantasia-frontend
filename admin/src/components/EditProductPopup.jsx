import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  handleEditProduct,
} from "../store/actions/actionProduct";
import { fetchCategories } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct({ visible, onClose, id }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
  });
  const dispatch = useDispatch();
  const product = useSelector((state) => {
    return state.productsReducer.productById;
  });
  const fetchDetail = async () => {
    try {
      setLoading(true);
      await dispatch(fetchProductById(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  let categories = useSelector((state) => {
    return state.categoryReducer.categories;
  });
  const fetchDataCategories = async () => {
    try {
      setLoading(true);
      await dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataCategories();
  }, []);

  useEffect(() => {
    setInput({
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      mainImg: product?.mainImg || "",
      categoryId: product?.categoryId || "",
    });
  }, [product]);

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
      await dispatch(handleEditProduct(input, id));
      toast.success("Successfully edit selected product", {
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
              Edit Product
            </h1>
            <div className="">
              <LiaWindowCloseSolid
                onClick={onClose}
                size="25px"
                className="cursor-pointer hover:bg-slate-100"
              />
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              <form onSubmit={handleSubmit} id="form-add" className="">
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
                <div className="flex flex-col mt-2">
                  <label className="text-black text-md ">Description</label>
                  <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Input description..."
                    className="w-[100%] h-10 pl-4 mt-1 bg-white border border-black text-black text-md"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label className="text-black text-md ">Price</label>
                  <input
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={handleChange}
                    placeholder="Input price..."
                    className="w-[100%] h-10 pl-4 mt-1 bg-white border border-black text-black text-md"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-black text-md ">Category</label>
                  <select
                    value={input.categoryId}
                    name="categoryId"
                    id="category"
                    onChange={handleChange}
                    className="w-[100%] h-10 pl-4 mt-1 bg-white border border-black text-black text-md"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((el) => {
                      return (
                        <option value={el.id} key={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-black text-md ">Image Url</label>
                  <input
                    type="text"
                    value={input.mainImg}
                    name="mainImg"
                    onChange={handleChange}
                    placeholder="Main image url..."
                    className="w-[100%] h-10 pl-4 mt-1 bg-white border border-black text-black text-md"
                  />
                </div>

                <div className="w-[100%] grid grid-cols-3 gap-2">
                  <button
                    type="submit"
                    className="h-10 mt-3 col-start-3 bg-black text-md text-white border border-black grid content-center hover:bg-[#1b1b1b] hover:text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
