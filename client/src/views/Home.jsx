import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/actionCreator";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => {
    return state.productsReducer.products;
  });
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 w-[100%] left-0 right-0 mx-auto">
        <div className="col-span-4 text-center mt-16 ">
          <h1>A quiet celebration of greenery</h1>
          <h1 className="text-7xl mt-8 font-[Kinfolk-Serif-Text]">
          Rooted in calm <br/>
          and quiet wonder
          </h1>
        <div className="flex  items-end col-span-2 mt-12 pb-16 h-[720px] w-[100%] bg-fixed bg-parallax bg-center bg-cover bg-slate-400 ">
          <div className="flex justify-between content-start w-[100%]">

          <h1 className="text-7xl font-[Kinfolk-Serif-Text] text-left text-white ml-12  ">
            Bring Nature <br/>Home
          </h1>
          <p className=" text-white text-left w-[600px]  mr-12">
          In a world that moves fast, we invite you to pause—
to find serenity in the simple, enduring presence of plants.
Our thoughtfully curated collection brings nature into your spaces,
fostering environments that breathe, soften, and soothe.
          </p>
          </div>
        </div>
        </div>


        {/* <div className="col-span-4 mx-auto">
          <Categories />
        </div> */}
        <div className="col-span-4 mx-12 mt-12 text-left  border-black border-b-2 pb-4 ">
          <h1 className="text-4xl font-[Kinfolk-Serif-Text]">Plantasia Shop</h1>
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-y-10 mx-8 mt-12 ">
          <div className="grid col-span-1">

          </div>
          <div className="grid grid-cols-3 col-span-3">

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
