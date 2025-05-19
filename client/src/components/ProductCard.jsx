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
              className="w-[350px] h-[350px] object-cover"
            />
          </Link>
        </div>
        <div className="grid justify-items-start w-[350px]">
          <div className="mb-4 mt-1">{product.Category.name.toUpperCase()}</div>
          <Link to={`/detail/${product.id}`}>
            <div>{product.name}</div>
          </Link>
          <div>${product.price}</div>
        </div>
      </div>
    </>
  );
}
