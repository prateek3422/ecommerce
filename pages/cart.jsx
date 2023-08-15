import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseFromCart, removeFromCart } from "./store/cartSlice";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleToDecreased = (item) => {
    dispatch(decreaseFromCart(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <>
      <div className="cart">
        <div className="flex justify-center items-center flex-col mb-16  ">
          <h1>Shopping Cart</h1>
        </div>
        {cart.cartItem.length === 0 ? (
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
              {cart.cartItem?.map((item) => {
                // console.log(item.product)
                return (
                  <>
                    <div key={item._id} className="cart-list items-center m-4 ">
                      <div className="items flex  items-center">
                        <img
                          className="object-cover object-center rounded"
                          alt="hero"
                          src="https://dummyimage.com/100x100"
                        />
                        <div className="img-des flex flex-col ml-6">
                          <p>{item.name}</p>
                          <button onClick={() => handleRemoveFromCart(item)}>
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                      <p>{item.price}</p>
                      <div className="quantity-box flex flex-row items-center">
                        <button onClick={() => handleAddToCart(item)}>
                          <IoMdAdd />
                        </button>

                        <p>{item.cartQuantity}</p>

                        <button onClick={() => handleToDecreased(item)}>
                          <AiOutlineMinus />
                        </button>
                      </div>
                      <p>{item.price * item.cartQuantity}</p>
                    </div>
                    <hr className=" h-0.5 bg-black" />

                    <div className="cart-checkout flex justify-between items-center mt-8">
                      <div className="clear-cart">
                        <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          clear Cart
                        </button>
                      </div>
                      <div className="total-amount w-52">
                        <div className=" subTotal flex justify-between mb-8">
                          <span>Sub Total</span>
                          <p >28939</p>
                        </div>
                          <StripeCheckout 
                          name="my store"
                          amount={item.price}
                          currency="INR"
                          shippingAddress={true}
                          billingAddress={true}
                          zipCode={true}
                          />
                      </div>
                    </div>
                  </>
                );
              })}
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
};

// export default Cart
export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
