import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import baseUrl from "@/util/baseUrl";
import { BsArrowLeftSquareFill } from "react-icons/bs";

const order = ({ orders }) => {
  // const cookie = parseCookies();
  // const router = useRouter()
  // console.log(orders)
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">

        <div className="flex justify-center items-center flex-col mb-16  ">
          <h1>Your Order</h1>
        </div>

        {
          orders.length === 0 ? (
            <div className="cart-empty">
            <div className="carts">
              <h1>Your order is Emapty</h1>
            </div>
            <div className="start-Shopping">
              <BsArrowLeftSquareFill />
              <Link href="/product">
                <h5>start Shopping</h5>
              </Link>
            </div>
          </div>
          ): (
        <div className="container px-5 py-16 mx-auto">
          {orders?.map((item) => {
            console.log("🚀 ~ file: order.jsx:18 ~ orders?.map ~ ̥:", item);
            return (
              <div key={item._id}>
              {item?.products?.map((product) => {
                      return (
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                      // console.log(product);
                        <div key={product._id}>
                          <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {product.product.name}
                          </h2>
                          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                            Animated Night Hill Illustrations
                          </h1>
                          <div className="flex mb-4">
                            <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                              Description
                            </a>
                          </div>
                          <p className="leading-relaxed mb-4">
                            {product.product.description}
                          </p>
                          <div className="flex border-t border-b mb-6 border-gray-200 py-2 justify-between">
                            <span className="text-gray-500">Quantity</span>

                            <span className=" ml-auto text-gray-900">
                              {product.quantity}
                            </span>
                          </div>
                        </div>



                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        {item.total}
                      </span>
                      <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        <Link href="/">Home</Link>
                      </button>
                    </div>
                  </div>
                  <img
                    alt="ecommerce"
                    className="lg:w-1/2 w-full object-cover object-center rounded"
                    src={product.product.imageUrl}
                    />
                </div>
                    );
              })}
                <hr className=" mb-6 border-gray-200 py-2 " />
              </div>
            );
          })}

        </div>
          )}
      </section>
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

export default order;
