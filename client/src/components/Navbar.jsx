import Logo from "/logo.svg";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="w-[1440px] left-0 right-0 mx-auto sticky top-0 z-50 ">
        <div className="mx-12 border-black grid grid-cols-2 py-5">
          <div className="flex flex-row gap-8 text-md font-semibold">
            <Link to={`/`}>
              <img src={Logo} alt="logo" className="h-6" />
            </Link>
          </div>
          <div className="flex flex-row justify-end gap-8">
            <a href="" className="grid place-content-center">
              <div>
                <AiOutlineShopping size="25px" />
              </div>
            </a>
            <a href="" className="grid place-content-center">
              <div>
                <AiOutlineSearch size="25px" />
              </div>
            </a>
            <a href="" className="grid place-content-center">
              <div>
                <GiHamburgerMenu size="25px" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
