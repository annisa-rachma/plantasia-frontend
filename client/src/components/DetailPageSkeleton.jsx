import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function DetailPageSkeleton() {
  return (
    <>
      <div className="col-span-3">
        <Skeleton height={650} />
      </div>
      <div className="pl-4 flex flex-col gap-y-5">
        <div>
          <Skeleton height={50} />
          <div className="mt-4 mb-8">
            <Skeleton height={30} />
          </div>
          <div className="mb-4">
            <Skeleton height={150} />
          </div>
        </div>
        <div>
          <Skeleton height={50} style={{ marginBottom: ".7rem" }} />
          <Skeleton height={50} />
        </div>
      </div>
    </>
  );
}
