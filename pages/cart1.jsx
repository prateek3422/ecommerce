import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cart = ({ error, product }) => {
  const { token } = parseCookies();

  if (!token) {
    return (
      <div className="flex justify-center items-center flex-col">
        <h1>plaese login to access cart </h1>
        <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link href="/signin">Loggin to Add</Link>
        </button>
      </div>
    );
  }

  // console.log(error)
  if (error) {
    const router = useRouter();
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/signin");
  }

  return (
    <>
      <div className="container">
        <div className="flex justify-center items-center flex-col mb-16 ">
          <h1>Cart</h1>
            </div>

          <div className="w-full flex  justify-around items-center mb-4">
            <p>Items </p>
            <p>Quantity </p>
            <p>Price </p>
            <p>total </p>
          </div>
          <hr />

          <div >
            {product?.map((item) => {
              // console.log(item.product)
              return (
                <>
                <div className="flex justify-around items-center mb-4 ">
                  <div className="items flex  items-center">
                <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/100x100"/>
                <p>{item.product.name}</p>           
                  </div>
                  <div>

                  <p>{item.quantity}</p>
                  </div>
                <p>{item.product.price}</p>
                <p>{item.product.price * item.quantity}</p>
                </div>
                <hr />
                </>
              )
            })}
          </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      props: {
        products: [],
      },
    };
  }
  const res = await fetch("http://localhost:3000/api/cart", {
    headers: {
      Authorization: token,
    },
  });
  const product = await res.json();

  if (product.error) {
    return {
      props: {
        error: product.error,
      },
    };
  }

  // console.log('product',  product)

  return {
    props: {
      product,
    },
  };
};

export default cart;
