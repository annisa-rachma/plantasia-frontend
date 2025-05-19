export default function Footer() {
  return (
    <>
      <div className="w-[1440px] left-0 right-0 mx-auto mb-8 mt-24 sticky top-0 z-50 bg-white">
        <div className="mx-4 border-t-[4px] border-black grid grid-cols-3 py-5">
          <div className="flex flex-row gap-8">
            <div className="grid place-content-center">© Kinfolk 2023</div>
            <a href="" className="grid place-content-center">
              <div className="hover:text-gray-600">Terms</div>
            </a>
            <a href="" className="grid place-content-center">
              <div className="hover:text-gray-600">Subscribe</div>
            </a>
          </div>
          <div className="flex flex-row gap-8 text-md font-medium mx-auto">
            <a href="">
              <div className="hover:text-gray-600">Facebook</div>
            </a>
            <a href="">
              <div className="hover:text-gray-600">Twitter</div>
            </a>
            <a href="">
              <div className="hover:text-gray-600">Instagram</div>
            </a>
          </div>
          <div className="flex justify-end">
            <a href="" className="">
              <div className="hover:text-gray-600">
                Website design & development by Six
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
