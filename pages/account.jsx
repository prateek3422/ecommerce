import dynamic from "next/dynamic";
import Link from "next/link";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import baseUrl from "@/util/baseUrl";

const Account = (orders) => {

  const cookie = parseCookies();
  const router = useRouter()

  const user = cookie.user ? JSON.parse(cookie.user) : "";

  return (
    <>
      <div className="acontainer flex justify-center">
        <div className="profile-card">
          <div className=" mt-12 account-card">
            <div className="pro-img">
              <img src="/images/avatar.svg" alt="" />
            </div>
            <div className="pro-para">
              <div className="user-details">
                <div className="mb-8">
                  <h3>Full Name</h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
         
              </div>
              <div className="pro-btn">
                  <button
                    className="flex w-full justify-center mb-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <Link  href="/order">
                    My Order 
                    </Link>
                  </button>

                  {/* <button
                    className="flex w-full justify-center mb-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    channge Password
                  </button> */}


<button
              className="w-full  flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("user");
                router.push("/signin");
              }}
              >
              logout
            </button>
              
                  
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { location: "/signin" });
    res.end();
  }

  const res = await fetch(`${baseUrl}/api/order`, {
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();
  return {
    props: { orders: data },
  };
};

// export default account
export default dynamic(() => Promise.resolve(Account), {
  ssr: false,
});
