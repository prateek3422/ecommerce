import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React from "react";

const account = (orders) => {
  console.log(orders);
  const cookie = parseCookies();

  const user = cookie.user ? JSON.parse(cookie.user) : "";


  return (
    <>
      <div className="container flex justify-center">
        <div className="profile-card">
          <div className="flex mt-24">
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
                <div className="pro-btn">
                  
                </div>
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

  const res = await fetch("http://localhost:3000/api/order", {
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
export default dynamic(() => Promise.resolve(account), {
  ssr: false,
});
