import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React from "react";

const account = (orders) => {
  console.log(orders);
  const cookie = parseCookies();


  const user = cookie.user ? JSON.parse(cookie.user) : "";

  const orderHistry = () =>{
    return(
      <>
      {
        orders?.map((item) =>{
          console.log(item)
          return(
            <>
            </>
          )
        })
      }
      </>
    )

  }

  return (
    <>
      <p>account</p>
      <h1>{user.name}</h1>
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
      "Authorization": token,
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    props: {orders : data},
  };
};

// export default account
export default dynamic(() => Promise.resolve(account), {
  ssr: false,
});
