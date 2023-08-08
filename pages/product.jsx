import Link from 'next/link'
import React from 'react'
import {BsFillGridFill} from "react-icons/bs";
import {FaThList} from "react-icons/fa";

const product = ({data}) => {

  
  //  console.log("🚀 ~ file: product.jsx:8 ~ product ~ ̥: ",data )
  return (
    <>
    <section>
      <div className="container ">
        <div className="main-component flex flex-row  justify-evenly">
          <div className="conponent1">

            <div className="search">
              <input type="text" placeholder='Search' />

            </div>
            <div className="category flex flex-col mt-8">
              <h1 className='mb-4  '>category</h1>
              <span>All</span>
              <span>laptop</span>
              <span>mobile</span>
              <span>computer</span>
              <span>watch</span>
            </div>
            <div className="company mt-8">
              <h1>company</h1>
              <p >All</p>
            </div>
          </div>

          <div className="component2 ">
            <div className="filters-box flex flex-col justify-between">
              <div className="icons flex ">

             <span>
               <BsFillGridFill/>
              </span>
              
              <span>
                <FaThList/>
                </span>
              </div>

              <p>{data.product.length} Total product</p>

              <div className="dropdown">
                <p>price</p>
              </div>

            </div>
            <div className="product grid grid-cols-3 gap-4">


            {
              data.product?.map((product)=>{
                
                // console.log("🚀 ~ file: product.jsx:59 ~ data?.product?.map ~ ̥:", product)
                return(
                  
                  <div   key={product._id}> <Link href={`/product/${encodeURIComponent(product._id)}`}>


                  <div className="card " >
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
                  
                )

              })
            }
          

              <div className="card ">
                <div className="box">
                <img src="/images/pro1.jpg" alt="" />

                </div>
                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>

              <div className="card ">
                <div className="box">
                <img src="/images/pro2.jpg" alt="" />
                </div>
                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>

              <div className="card ">
                <div className="box">
                <img src="/images/pro3.jpg" alt="" />

                </div>
                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>
              <div className="card ">
                <div className="box">
                <img src="/images/pro1.jpg" alt="" />

                </div>
                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>
              <div className="card ">
                <div className="box">
                <img src="/images/pro5.jpg" alt="" />

                </div>
                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>
              <div className="card ">
                <div className="box">
                <img src="/images/pro.jpg" alt="" />
                </div>

                <div className="para">

                <p>pname</p>
                <p>3222</p>
                </div>
              </div>



            </div>


          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/products/getAllProduct')
    const data = await res.json()


    return { 
        props: {
         data
        }
    
    }
  }

export default product