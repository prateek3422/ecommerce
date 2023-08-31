import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseFromCart, removeFromCart } from "../util/store/cartSlice";
import StripeCheckout from "react-stripe-checkout";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import baseUrl from "@/util/baseUrl";

const Cart = ({ error, product }) => {
  const { token } = parseCookies();
  const router = useRouter();

  const [cproduct, setCproducts] = useState(product);

  let price = 0;
  const { count, setCount } = useState(0);
  // console.log(product)

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

  if (error) {
    
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

  // const cart = useSelector((state) => state.cart);
  // // console.log(cart);
  // const dispatch = useDispatch();

  const handleRemoveFromCart = async (item) => {

    const res = await fetch("http://localhost:3000/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        productId: item.product._id,
      }),
    });

    const data = await res.json();
    setCproducts(data);
    toast.info("product remove", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // dispatch(removeFromCart(item));
  };

  const handleToDecreased = (item) => {
    // dispatch(decreaseFromCart(item));
  };

  // const handleAddToCart = ( item) => {

  //   // dispatch(addToCart(item));

  // };

  // const increament =(item) =>{
  //   setCount(item.quantity+1)
  // }

  const handleToPay = async (paymentInfo) => {
    const res = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":token 
      },
      body: JSON.stringify({
        paymentInfo
      }),
    });
    const data = await res.json();
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  };

  return (
    <>
      <div className="cart">
        <div className="flex justify-center items-center flex-col mb-16  ">
          <h1>Shopping Cart</h1>
        </div>
        {product.length === 0 ? (
          <div className="cart-empty">
            <h1>Shopping Cart is Emapty</h1>
            <div className="start-Shopping">
              <Link href="/product">
                <BsArrowLeftSquareFill />
                <span>start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="container flex justify-center items-center">
              <div className="cart-container w-10/12">
                <div className="w-full cart-list mb-4">
                  <p>Items </p>
                  <p>Price </p>
                  <p>Quantity </p>
                  <p>total </p>
                </div>
                <hr className=" h-0.5 bg-black" />
                {cproduct?.products?.map((item) => {
                  // console.log("🚀 ~ file: cart.jsx:103 ~ {[product]?.map ~ ̥:", item.product._id)
                  price = price + item.quantity * item.product.price;
                  return (
                    <>
                      <div
                        key={item.product._id}
                        className="cart-list items-center m-4 "
                      >
                        <div className="items flex  items-center">
                          <Image
                            className="object-cover object-center rounded"
                            alt="hero"
                            src="https://dummyimage.com/100x100"
                          />
                          <div className="img-des flex flex-col ml-6">
                            <p>{item.product.name}</p>
                            <button onClick={() => handleRemoveFromCart(item)}>
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                        <p>{item.product.price}</p>
                        <div className="quantity-box flex flex-row items-center">
                          {/* <button>
                            <IoMdAdd />
                          </button> */}
                          <p>{item.quantity}</p>

                          {/* <button>
                            <AiOutlineMinus />
                          </button> */}
                        </div>
                        <p>{item.product.price * item.quantity}</p>
                      </div>
                      <hr className=" h-0.5 bg-black" />
                    </>
                  );
                })}

                <div className="cart-checkout flex justify-between items-center mt-8">
                  <div className="clear-cart">
                    {/* <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      clear Cart
                    </button> */}
                  </div>
                  <div className="total-amount w-52">
                    <div className=" subTotal flex justify-between mb-8">
                      <span>Sub Total</span>
                      <p>{price}</p>
                    </div>
                    <StripeCheckout
                      name="my store"
                      amount = {price * 100}
                      currency="INR"
                      shippingAddress={true}
                      billingAddress={true}
                      zipCode={true}
                      stripeKey="pk_test_51IvaX7SG7v570Cxty4ZuL1oGQXaZfKwy22i3IXcjrZ2SoRXSaH8Yohm7Mx0QNYAwTAONGGgo48ubzAkVGGgZSigQ00q2XNaUwn"
                      token={(paymentInfo) => handleToPay(paymentInfo)}
                    >
                      <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        checkout
                      </button>
                    </StripeCheckout>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
  const res = await fetch(`${baseUrl}/api/cart`, {
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

// export default Cart
export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
