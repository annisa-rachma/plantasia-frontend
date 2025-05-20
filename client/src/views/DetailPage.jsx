import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/actions/actionCreator";
import DetailPageSkeleton from "../components/DetailPageSkeleton";
import Carousel from "../components/Carousel";
import "react-loading-skeleton/dist/skeleton.css";

export default function DetailPage() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state.productsReducer.productById);
  const dispatch = useDispatch();

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
  }, []);

  let images = [product?.mainImg];
  product?.Images?.forEach((el) => {
    images.push(el.imgUrl);
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {loading && <DetailPageSkeleton />}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {product?.Images?.length > 0 ? (
              <Carousel>
                {images.map((s, idx) => (
                  <img src={s} alt={`product-img-${idx}`} key={idx} />
                ))}
              </Carousel>
            ) : (
              <img src={product?.mainImg} alt="main" />
            )}
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                {product?.name}
              </div>
              <div className="text-base sm:text-lg font-medium mt-2">
                {product?.Category?.name?.toUpperCase()}
              </div>
              <div className="text-base sm:text-lg font-medium mt-2 mb-6">
                ${product?.price}
              </div>
              <div className="mb-4 font-[Kinfolk-Serif-Text] text-sm sm:text-base">
                {product?.description}
              </div>
            </div>

            <div>
              <select className="w-full px-4 py-3 border border-black">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <a href="#" className="w-full">
              <div className="border border-black py-3 font-medium grid place-content-center hover:bg-black hover:text-white transition-colors duration-200">
                Add to basket
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
