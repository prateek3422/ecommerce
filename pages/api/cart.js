const jwt = require("jsonwebtoken");
import Cart from "@/model/cart";
import dbConnect from "@/util/db";


dbConnect();


export default async (req,res)=>{
  switch(req.method){
      case "GET":
          await fetchUserCart(req,res)
          break
      case "PUT":
          await addProduct(req,res)  
          break   
      // case "DELETE":
      //     await removeProduct(req,res) 
      //     break   
  }
}

function Authenticated(icomponent) {
  return (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "you must login" });
    }
    try {
      const { userId } = jwt.verify( authorization, process.env.JWT_TOKEN);
      req.userId = userId;
      return icomponent(req, res);
    } catch (error) {
      
      return res.status(500).json({ error: 'internal error' });
    }
  };
}

const fetchUserCart = Authenticated(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId })
                .populate('products.product')
  res.status(200).json(cart.products);
});
const addProduct = Authenticated(async (req, res) => {
  const { productId } = req.body;
  
  const cart =  await Cart.findOne({user: req.userId})


  const pExists =  cart.products.some(pdoc => productId === pdoc.product.toString() )

  


  if(pExists){
     await Cart.findOneAndUpdate(
         {_id:cart._id,"products.product":productId},
         {$inc:{"products.$.quantity":1}}
     )
  } else {
    const newProduct = {product:productId}
         await Cart.findOneAndUpdate(
             {_id:cart._id},
             {$push:{products:newProduct}}
             )
     }
     res.status(200).json({message:"product added to cart"})

});
