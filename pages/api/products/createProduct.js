import Product from "@/model/Product";
import dbConnect from "@/util/db";


export default async function post(req, res) {
  try {

    await dbConnect();
    const product = await Product.create(req.body)
    console.log(product)
    res.status(200).json({
      message: "Product create successfull",
      product,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
