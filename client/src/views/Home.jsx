import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/actionCreator";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const plantType = [
  {
    id: 1,
    name: "Foliage Plants",
  },
  {
    id: 2,
    name: "Palms",
  },
  {
    id: 3,
    name: "Indoor Trees",
  },
  {
    id: 4,
    name: "Ferns",
  },
  {
    id: 5,
    name: "Cacti & Succulents",
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => {
    return state.productsReducer.products;
  });
  const dispatch = useDispatch();
  const [isFiltering, setIsFiltering] = useState(false);
  const [showPlantType, setShowPlantType] = useState(true);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const current = searchParams.getAll("type");

    const updated = isChecked
      ? [...new Set([...current, value])]
      : current.filter((v) => v !== value);

    searchParams.delete("type");
    updated.forEach((v) => searchParams.append("type", v));

    setSearchParams(searchParams);
  };

  const handleClearFilter = () => {
    setSearchParams("");
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const query = searchParams.toString();
      const queryString = query ? `?${query}` : "";
      await dispatch(fetchProducts(queryString));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.toString()) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  }, [searchParams]);

  const togglePlantType = () => {
    setShowPlantType((prev) => !prev);
  };

  return (
    <>
      <div className="grid grid-cols-4 w-[100%] left-0 right-0 mx-auto">
        <div className="col-span-4 text-center mt-16 ">
          <h1>A quiet celebration of greenery</h1>
          <h1 className="text-7xl mt-8 font-[Kinfolk-Serif-Text]">
            Rooted in calm <br />
            and quiet wonder
          </h1>
          <div className="flex  items-end col-span-2 mt-12 pb-16 h-[720px] w-[100%] bg-fixed bg-parallax bg-center bg-cover bg-slate-400 ">
            <div className="flex justify-between content-start w-[100%]">
              <h1 className="text-7xl font-[Kinfolk-Serif-Text] text-left text-white ml-12  ">
                Bring Nature <br />
                Home
              </h1>
              <p className=" text-white text-left w-[600px]  mr-12">
                In a world that moves fast, we invite you to pause— to find
                serenity in the simple, enduring presence of plants. Our
                thoughtfully curated collection brings nature into your spaces,
                fostering environments that breathe, soften, and soothe.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-4 mx-12 mt-12 text-left  border-black border-b-2 pb-4 ">
          <h1 className="text-4xl font-[Kinfolk-Serif-Text]">Plantasia Shop</h1>
        </div>
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-4 gap-y-10 mx-8 mt-12 ">
          <div className="md:col-span-1 mx-4  ">
            <div className="border-black border-b-2 pb-1 flex justify-between items-stretch">
              <h1 className="text-xl font-[Kinfolk-Serif-Text] self-end ">
                Filter
              </h1>
              {isFiltering && (
                <p
                  className="self-end hover:underline hover:cursor-pointer"
                  onClick={handleClearFilter}
                >
                  Clear All
                </p>
              )}
            </div>

            <form className="">
              <div className="border-black border-b-2 py-4">
                <div
                  className="flex justify-between items-center hover:cursor-pointer"
                  onClick={togglePlantType}
                >
                  <h1 className="text-xl font-[Kinfolk-Serif-Text]">
                    Plant Type
                  </h1>
                  <span>
                    {showPlantType ? (
                      <AiOutlineCaretDown />
                    ) : (
                      <AiOutlineCaretUp />
                    )}
                  </span>
                </div>
                {showPlantType && (
                  <div className="flex flex-col gap-1 mt-2">
                    {plantType.map((type, idx) => {
                      return (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id={type.id}
                            name="type"
                            value={type.id}
                            checked={searchParams
                              .getAll("type")
                              .includes(String(type.id))}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5  bg-black border-gray-300 focus:-ring-black-500 accent-black hover:cursor-pointer"
                          ></input>
                          <label
                            htmlFor={type.id}
                            className="hover:cursor-pointer"
                          >
                            {type.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 md:col-span-3 gap-2">
            {loading && <ProductCardSkeleton cards={8} />}
            {!loading &&
              products?.map((product, idx) => {
                return <ProductCard key={idx} product={product} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
