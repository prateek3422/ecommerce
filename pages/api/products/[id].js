const Product = require("@/model/Product");
const { default: dbConnect } = require("@/util/db");

export default async function (req, res) {

    try {
        await dbConnect();
        // const {id} = req.query


    
        const product = await Product.findById(req.query.id)
    
        if(!product){
            return res.status(401).json({err: "product does not exist"})
        }

        res.json({product})
    
    } catch (error) {
        return res.status(401).json({err: error})
        
    }
   
    


}

