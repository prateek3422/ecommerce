import baseUrl from "@/util/baseUrl";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const imageUrl = await imageUplaod()
      const res = await fetch(`${baseUrl}/api/products/productController`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          title,
          description,
          price,
          category,
          imageUrl
        }),
      });

      const data = await res.json();



      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("create successful", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const imageUplaod= async() =>{
    const data = new FormData()
   data.append('file', media)
   data.append('upload_preset', 'r5qdd5lb')
   data.append('cloud_name','dxpahuuq1')


    const res = await fetch('https://api.cloudinary.com/v1_1/dxpahuuq1/image/upload',{
        method: "POST",
        body:data
    })

    const response = await res.json()

    return response.url
  }



  return (
    <>
      <div className="section-cp">
        <div className="createProduct">
          <div className="cp-card">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="description"
                      name="description"
                      type="message"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      type="text"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="category"
                      name="category"
                      type="text"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    ></label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="media"
                      name="media"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>{setMedia(e.target.files[0])}}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center mb-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
