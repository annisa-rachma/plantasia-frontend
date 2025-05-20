import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/actionCreator";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { plantHeight, plantType } from "../store/data/data";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => {
    return state.productsReducer.products;
  });
  const dispatch = useDispatch();
  const [isFiltering, setIsFiltering] = useState(false);
  const [showPlantType, setShowPlantType] = useState(true);
  const [showPlantHeight, setShowPlantHeight] = useState(true);
  const selectedType = searchParams.getAll("type");
  const selectedHeight = searchParams.getAll("height");

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const name = e.target.name;

    const newParams = new URLSearchParams(searchParams.toString());

    const current = newParams.getAll(name);

    const updated = isChecked
      ? [...new Set([...current, value])]
      : current.filter((v) => v !== value);

    newParams.delete(name);
    updated.forEach((v) => newParams.append(name, v));

    setSearchParams(newParams);
  };

  const handleClearFilter = () => {
    setSearchParams("");
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        setLoading(true);
        const query = searchParams.toString();
        await dispatch(fetchProducts(query ? `?${query}` : ""));
        setIsFiltering(Boolean(query));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSet();
  }, [searchParams]);

  const togglePlantType = () => {
    setShowPlantType((prev) => !prev);
  };
  const togglePlantHeight = () => {
    setShowPlantHeight((prev) => !prev);
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
              <FilterSection
                title={"Plant Type"}
                name={"type"}
                toggle={togglePlantType}
                showSection={showPlantType}
                optionValues={plantType}
                selectedValue={selectedType}
                handleCheckboxChange={handleCheckboxChange}
              />
              <FilterSection
                title={"Plant Height"}
                name={"height"}
                toggle={togglePlantHeight}
                showSection={showPlantHeight}
                optionValues={plantHeight}
                selectedValue={selectedHeight}
                handleCheckboxChange={handleCheckboxChange}
              />
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
