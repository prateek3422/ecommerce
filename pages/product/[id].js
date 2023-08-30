import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const productDetails = ({ data }) => {
  // const dispatch = useDispatch();
  // console.log(data)
  // console.log("🚀 ~ file: [id].js:6 ~ productDetails ~ ̥:", data.product);

  const router = useRouter();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(JSON.stringify(cookie.user)) : "";

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   router.push('/cart')
  // };

  const AddToCart = async (product)=>{
    const res =  await fetch('http://localhost:3000/api/cart',{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":cookie.token
      },
      body:JSON.stringify({
        quantity: 1,
       productId:product._id
      })
    })
  const response = await res.json()
  // console.log("🚀 ~ file: [id].js:36 ~ AddToCart ~ ̥:",response )
  if(response.error){
    toast.error(response.error,{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
     Cookies.remove("user")
     Cookies.remove("token")
     router.push('/login')
  }else{
    toast.success("product added to cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

      router.push("/cart");


  }


  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {[data].map(({product}) => {
            // console.log(product)
            return (
              <>
                <div key={product._id} className="lg:w-4/5 mx-auto flex flex-wrap">
                  <img
                    alt="ecommerce"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                    src="/images/pro1.jpg"
                  />

                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      {product.name}
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {product.title}
                    </h1>
                    <p className="leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                      <div className="flex">
                        <span className="mr-3">Color</span>
                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      </div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        {product.price}
                      </span>
                      {user ? (
                        <button
                          onClick={() => AddToCart(product) }
                          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        >
                          AddToCart
                        </button>
                      ) : (
                        <button
                          onClick={() => router.push("/signin")}
                          className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        >
                          Login To Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {



  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

// export default productDetails;
export default dynamic(() => Promise.resolve(productDetails), {
  ssr: false,
});
