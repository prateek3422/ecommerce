import Link from "next/link";
import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Search from "./component/search";
import queryString from "query-string";

const product = ({ data }) => {
  //  console.log("🚀 ~ file: product.jsx:8 ~ product ~ ̥: ",data )
  return (
    <>
      <section>
        <div className="container ">
          <div className="main-component flex flex-row  justify-evenly">
            <div className="conponent1">
              <div className="search">
                <Search />
              </div>
              <div className="category flex flex-col mt-8">
                <h1 className="mb-4  ">category</h1>
                <span>All</span>
                <span>laptop</span>
                <span>mobile</span>
                <span>computer</span>
                <span>watch</span>
              </div>
              <div className="company mt-8">
                <h1>company</h1>
                <p>All</p>
              </div>
            </div>

            <div className="component2 ">
              <div className="ml-32 filters-box flex flex-col justify-between none ">
                <div className="icons flex ">
                  <span>
                    <BsFillGridFill />
                  </span>

                  <span>
                    <FaThList />
                  </span>
                </div>

                {/* <p>{data.product.length} Total product</p> */}
              </div>
              <div className="product ">
                {data.product?.map((product) => {
                  // console.log("🚀 ~ file: product.jsx:59 ~ data?.product?.map ~ ̥:", product)
                  return (
                    <div key={product._id}>
                      <Link
                        href={`/product/${encodeURIComponent(product._id)}`}
                      >
                        <div className="card ">
                          <div className="box">
                            <img src="/images/pro.jpg" alt="" />
                          </div>
                          <div className="para">
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    `http://localhost:3000/api/products/productController`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default product;
