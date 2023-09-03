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

dbConnect();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProducts(req, res);
      break;
    // case "DELETE":
    //     await removeProduct(req,res)
    //     break
  }
};

// ---Get All Products------
const getProducts = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filters();
    const product = await apiFeatures.query;
    res.status(200).json({
      message: "success",
      product,
    });
  } catch (error) {
    // console.error(error)
    res.status(500).json({ error: error });
  }
};

//   create Product

const createProducts = async (req, res) => {
  try {
    const { name, title, description, price, category, imageUrl } = req.body;
    const product = await Product.create({
      name,
      title,
      description,
      price,
      category,
      imageUrl,
    });
    // console.log(product)
    res.status(200).json({
      message: "Product create successfull",
      product,
    });
  } catch (error) {
    // console.log(error)
    res.status(400).json(error);
  }
};
