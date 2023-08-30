import Cookies from "js-cookie";
import dynamic from "next/dynamic";

import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Nav from "./Nav";

const Header = () => {
  // const [openMenu, setOpenMenu] = useState(false);
  // const router = useRouter();
  // const cookie = parseCookies();
  // // console.log(cookie);

  // const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";


  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5 "></path>
            </svg>
            <span className="ml-3 text-xl capitalize ">Ecommerce</span>
          </a>
          {/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base gap-8 justify-center ">
            <div className={openMenu ? "active menu-icon" : " menu-icon"}>
              <ul className="nav-list">
                <li>
                  <Link href="/" className=" hover:text-gray-900">
                    Home
                  </Link>
                </li>

                <li>
                  <Link href="/product" className=" hover:text-gray-900">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="/about" className=" hover:text-gray-900">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </nav> */}

          {/* <Nav/> */}

          {/* <div className=" flex items-center">
            {user ? (
              <>
                <button
                  className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    Cookies.remove("token");
                    Cookies.remove("user");
                    router.push("/signin");
                  }}
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <Link href="/signin">login</Link>
                </button>
              </>
            )}

            <Link href="/cart" className=" cart ">
              <BsCart />
            </Link>
          </div>
          <div className="mobile-icon">
            <FaBars
              name="mobile-menu"
              className="mobile-nav-btn"
              onClick={() => setOpenMenu(true)}
            />
            <AiOutlineClose
              name="mobile-close"
              className=" mobile-nav-btn"
              onClick={() => setOpenMenu(false)}
            />
          </div> */}

          <Nav/>
        </div>
      </header>
    </>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
