import Image from "next/image";
import React from "react";

const HomeScreen = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="hero-main grid grid-cols-2 mt-8">
            <div className="hero-sec">
              <h1>Welcome</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique atque corrupti odio quasi qui aperiam accusamus
                repudiandae sapiente maiores omnis!
              </p>
              <button className="btn">shop now</button>
            </div>
            <div className="hero-img ">
              <Image src="/images/shop.jpg" alt="hero -img" />
            </div>
          </div>

          {/* ---------service section-------------- */}
{/* 
          <div className="service">
            <div className="heading flex justify-center items-center mt-32">
              <h1>service</h1>
            </div>
              <div className="service-card flex justify-around items-center gap-8  ">
                <div className="service-box">
                  <div className="service-box-img">
                    <img src="/images/1.jpg" alt="" />
                  </div>
                  <div className="service-para flex justify-between mr-4 ml-4">
                    <h1>product</h1>
                    <h1>1234</h1>
                  </div>
                </div>
                <div className="service-box">
                  <div className="service-box-img">
                    <img src="/images/1.jpg" alt="" />
                  </div>
                  <div className="service-para flex justify-between mr-4 ml-4">
                    <h1>product</h1>
                    <h1>1234</h1>
                  </div>
                </div>
                <div className="service-box">
                  <div className="service-box-img">
                    <img src="/images/1.jpg" alt="" />
                  </div>
                  <div className="service-para flex justify-between mr-4 ml-4">
                    <h1>product</h1>
                    <h1>1234</h1>
                  </div>
                </div>
              </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
