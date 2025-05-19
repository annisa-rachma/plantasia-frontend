import { useState, useEffect } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { handleAddProduct } from "../store/actions/actionProduct";
import { fetchCategories } from "../store/actions/actionCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct({ visible, onClose }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
    imgUrl: [
      {
        imgUrl: "",
      },
    ],
  });
  let categories = useSelector((state) => {
    return state.categoryReducer.categories;
  });
  const fetchDataCategories = async () => {
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
    fetchDataCategories();
  }, []);

  const handleAddInput = () => {
    if (input.imgUrl.length < 3) {
      setInput({
        ...input,
        imgUrl: [
          ...input.imgUrl,
          {
            imgUrl: "",
          },
        ],
      });
    }
  };
  const handleRemove = () => {
    const updatedImgUrl = input.imgUrl.slice(0, -1);
    return setInput({
      ...input,
      imgUrl: updatedImgUrl,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleImageChange = (event, idx) => {
    const { name, value } = event.target;
    let newImages = [...input.imgUrl];
    newImages[idx].imgUrl = value;
    setInput({
      ...input,
      imgUrl: newImages,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(handleAddProduct(input));
      console.log("add product success");
      setInput({
        name: "",
        description: "",
        price: "",
        mainImg: "",
        categoryId: "",
        imgUrl: [
          {
            imgUrl: "",
          },
        ],
      });
      toast.success("Successfully added a new product", {
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
              Create New Product
            </h1>
            <div className="">
              <LiaWindowCloseSolid
                onClick={onClose}
                size="25px"
                className="cursor-pointer hover:bg-slate-100"
              />
            </div>
          </div>

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

              {input.imgUrl.map((image, idx) => {
                // return <AdditionalInput key={idx} />
                return (
                  <div className="flex flex-row" key={idx}>
                    <input
                      type="text"
                      value={input.imgUrl[idx].imgUrl}
                      name="imgUrl"
                      onChange={(event) => handleImageChange(event, idx)}
                      placeholder="Additional image url..."
                      className="w-[85%] h-10 pl-4 mt-4 bg-white border border-black text-black text-md"
                    />
                    <div
                      onClick={handleRemove}
                      className="w-[15%] h-10 mt-4 cursor-pointer hover:underline grid content-center text-right"
                    >
                      remove
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-[100%] grid grid-cols-3 gap-2">
              <button
                onClick={handleAddInput}
                type="button"
                className="h-10 mt-3 bg-white text-md text-black border border-black grid content-center hover:bg-black hover:text-white"
              >
                Add Image
              </button>

              <button
                type="submit"
                className="h-10 mt-3 col-start-3 bg-black text-md text-white border border-black grid content-center hover:bg-[#1b1b1b] hover:text-white"
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
