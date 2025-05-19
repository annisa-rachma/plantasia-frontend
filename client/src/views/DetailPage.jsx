import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/actions/actionCreator";
import DetailPageSkeleton from "../components/DetailPageSkeleton";
import Carousel from "../components/Carousel";
import 'react-loading-skeleton/dist/skeleton.css'

export default function DetailPage() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => {
    return state.productsReducer.productById;
  });
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

  // console.log(id, product)

    let images = [product?.mainImg]
    product?.Images.forEach((el) => {
      images.push(el.imgUrl) 
    })
    // console.log(images)

  return (
    <>
      <div className="grid grid-cols-4 w-[1440px] left-0 right-0 mx-auto">
        <div className="col-span-4 mx-auto">
          <Categories />
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-4 mx-4">
          {loading && <DetailPageSkeleton />}
          {!loading && <>
          
          <div className="col-span-3">
          {product?.Images.length > 0 && (
                  <Carousel>
                    {images.map((s, idx) => (
                      <img src={s} alt="" key={idx} />
                    ))}
                  </Carousel>
                )}
            {product?.Images.length === 0 && (
                  <img src={product?.mainImg} alt="" />
            )}
          </div>
          <div className="pl-4 flex flex-col gap-y-5">
            <div>
              <div className="text-4xl">{product?.name}</div>
              <div className="text-lg font-medium mt-2">
                {product?.Category.name.toUpperCase()}
              </div>
              <div className="text-lg font-medium mt-2 mb-8">
                ${product?.price}
              </div>
              <div className="mb-4 font-[Kinfolk-Serif-Text]">
                {product?.description} <br />
                
              </div>
              <div className="mb-4 font-[Kinfolk-Serif-Text] ">
                by : {product?.User.email}
              </div>
            </div>
            <div>
              <select
                name=""
                id=""
                className="w-[100%] px-4 py-3 border border-black"
              >
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            </div>
            <a href="" className="w-[100%]">
              <div className="border border-black py-3 font-medium grid place-content-center  hover:bg-black hover:text-white">
                Add to basket
              </div>
            </a>
          </div> </>}
        </div> 
      </div>
    </>
  );
}
