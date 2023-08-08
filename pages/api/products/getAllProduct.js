import Product from "@/model/Product";
import dbConnect from "@/util/db";



export default async function GET (req,res) {
    try {
        await dbConnect()
        const product = await Product.find()    
        res.status(200).json({
            message: "success",
            product
    
        })
    } catch (error) {
        res.status(500).json({mes: error})
    }



}