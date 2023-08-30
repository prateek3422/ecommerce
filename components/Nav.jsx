import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const navbar = () => {
  const router = useRouter();
  const cookie = parseCookies();
  // console.log(cookie);
  
  const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";


  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <nav >
        <div className={openMenu ? "active mobileIcon" : "mobileIcon"}>
          <ul className="nav-list">
            <li >
              <Link href="/" className=" hover:text-gray-900"  onClick={() => setOpenMenu(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/product" className=" hover:text-gray-900"   onClick={() => setOpenMenu(false)}>
                Product
              </Link>
            </li>
            <li>
              <Link href="/about" className=" hover:text-gray-900"   onClick={() => setOpenMenu(false)}>
                About
              </Link>
            </li>
       
       

      {/* <div className="nav-list flex items-center"> */}
        {user ? (
          <>
               <li>
              <Link href="/account" className=" hover:text-gray-900"   onClick={() => setOpenMenu(false)}>
                Accounts
              </Link>
            </li>
          <div  onClick={() => setOpenMenu(false)}>

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
              </div>
          </>
        ) : (
          <>
          <div  onClick={() => setOpenMenu(false)}>
            <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link href="/signin">login</Link>
            </button>
          </div>
            
          </>
        )}

        <Link href="/cart" className=" cart "  onClick={() => setOpenMenu(false)}>
          <BsCart />
        </Link>
      {/* </div> */}

      </ul>
        </div>
        </nav>
      <div className="mobile-icon">
        <FaBars
          name="mobile-menu"
          className="mobile-nav-btn"
          onClick={() => setOpenMenu(true)}
        />
        
        <AiOutlineClose
          name="mobile-close"
          className="mobile-nav-btn"
          onClick={() => setOpenMenu(false)}
        />
      </div>

    </>
  );
};

export default navbar;
