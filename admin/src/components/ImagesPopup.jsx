import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../store/actions/actionProduct";
import Carousel from "./Carousel";
import { LiaWindowCloseSolid } from "react-icons/lia";

export default function ImagesPopup({ visible, onClose, id }) {
    // console.log(id)
    // const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const product = useSelector((state) => {
        return state.productsReducer.productById;
    }) 

    // console.log(id)
    const dispatch = useDispatch()

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

      let images = [product?.mainImg]
    product?.Images.forEach((el) => {
      images.push(el.imgUrl) 
    })
      //  console.log(product)

    if (!visible) return null;
  
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white p-6 w-[500px]">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="font-semibold text-center text-xl text-black">
              Images
            </h1>
            <div className="">
              <LiaWindowCloseSolid onClick={onClose} size="25px" className="cursor-pointer hover:bg-slate-100"/>
            </div>

          </div>
            {loading && <p>Loading...</p> }
            {!loading && <Carousel>
              {[
                ...images?.map((s, idx) => {
                  return <img src={s} alt="" key={idx} />
                })
              ]}
            </Carousel>}
          </div>
        </div>
      </>
    );
  }
  