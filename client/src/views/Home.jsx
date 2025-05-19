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
      <div className="grid grid-cols-4 w-[1440px] left-0 right-0 mx-auto">
        <div className="col-span-4 text-center mt-16 mx-4">
          {/* <h1>ARTS & CULTURE FASHION ISSUE 49</h1>
          <h1 className="text-7xl mt-12 font-[Kinfolk-Serif-Text]">
            A WORLD OF
          </h1>
          <h1 className="text-7xl mt-6 font-[Kinfolk-Serif-Text]">
            DIFFERENCE
          </h1>
          <h1 className="mt-12 ">A fun lesson in cultural faux pas.</h1> */}
        <div className="flex flex-col items-center col-span-4 mt-12 justify-center h-[500px] w-[100%] bg-fixed bg-parallax bg-center bg-cover bg-slate-400 ">
          <h1 className="text-7xl font-[Kinfolk-Serif-Text] text-white">
            THE ART OF KINFOLK
          </h1>
          <h1 className="mt-6 text-xl text-white font-[Kinfolk-Serif-Text]">
            An Iconic Lens on Life and Style.
          </h1>
        </div>
        </div>


        <div className="col-span-4 mx-auto">
          <Categories />
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-y-10 ">
          {loading && <ProductCardSkeleton cards={8} />}
          {!loading &&
            products?.map((product, idx) => {
              return <ProductCard key={idx} product={product} />;
            })}
        </div>
      </div>
    </>
  );
}
