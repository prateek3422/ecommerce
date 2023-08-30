import Cookies from "js-cookie";
import dynamic from "next/dynamic";

import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const cookie = parseCookies();
  // console.log(cookie);

  const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";

  // const {user , setUser} = useState({})
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl capitalize">Ecommerce</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center nav">
              <Link href="/" className="mr-5 hover:text-gray-900">
                Home
              </Link>

              <Link href="/product" className="mr-5 hover:text-gray-900">
                Product
              </Link>

              <Link href="/about" className="mr-5 hover:text-gray-900">
                About
              </Link>
          </nav>
          <div className="nav flex items-center">

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

            <Link href="/cart" className="ml-4 cart ">
              <BsCart />
            </Link>

          </div>
            <div className="mobile-icon">
              <FaBars    name="mooblie-menu" className="mobile-menu-btn"/>
              <AiOutlineClose name="mooblie-close" className="mobile-close-btn"/>
            </div>
            </div>

      </header>
    </>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
