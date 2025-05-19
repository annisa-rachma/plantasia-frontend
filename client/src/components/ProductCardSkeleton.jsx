import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductCardSkeleton({ cards }) {
  return (
    <>
       {Array(cards).fill(0).map((item, index) => {
        return (
          <div className="px-4" key={index}>
          <div>
            <Skeleton
              containerClassName="w[350px]"
              height={345}
              style={{ marginBottom: ".3rem" }}
            />
          </div>
          <div>
            <Skeleton containerClassName="w[350px]" count={3} />
          </div>
        </div>
        )
       })}
     
    </>
  );
}
