import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="px-4">
        <div className="">
          <Link to={`/detail/${product.id}`}>
            <img
              onClick={handleScroll}
              src={product.mainImg}
              alt=""
              className="w-[350px] h-[350px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </Link>
        </div>
        <div className="grid justify-items-start max-w-[350px]">
          <Link to={`/detail/${product.id}`}>
            <div className="mt-1 font-medium overflow-auto">{product.name}</div>
          </Link>
          <div>${product.price}</div>
        </div>
      </div>
    </>
  );
}
