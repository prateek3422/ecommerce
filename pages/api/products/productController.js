import Product from "@/model/Product";
import ApiFeatures from "@/util/ApiFeatures";
import dbConnect from "@/util/db";

const cloudinary = require("cloudinary");



// export default async function GET (req,res) {
//     try {
//         await dbConnect()
        

//         const apiFeatures = new ApiFeatures(Product.find(), req.querry).search()
//         console.log(apiFilters)
//         const product = await apiFeatures.querry
//         res.status(200).json({
//             message: "success",
//             product
    
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({error: error})
//     }



// }

dbConnect()
export default async (req,res)=>{
    switch(req.method){
        case "GET":
            await getProducts(req,res)
            break
        case "POST":
            await createProducts(req, res)  
            break   
        // case "DELETE":
        //     await removeProduct(req,res) 
        //     break   
    }
  }

// ---Get All Products------
  const getProducts = async (req, res) =>{
    try {    
                const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filters()
                const product = await apiFeatures.query
                res.status(200).json({
                    message: "success",
                    product
            
                })
            } catch (error) {
                // console.error(error)
                res.status(500).json({error: error})
            }
  }


//   create Product
  

  const createProducts = async (req, res) =>{

    try {

      let images = []

      if(typeof req.body.images === "string"){
        images.push(req.body.images)
      }else{
        images = req.body.images
      }


      const imageLinks =[]

      for(var i=0; i<images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
          folder:'product'
        })


        imageLinks.push({
          public_id: result.public_id,
          url_id: result.url_id
        })
      }

       req.body.images = imageLinks
       req.body.user = req.user.id;




        const product = await Product.create(req.body)
        // console.log(product)
        res.status(200).json({
          message: "Product create successfull",
          product,
        });
      } catch (error) {
        // console.log(error)
        res.status(400).json(error)
      }

  }