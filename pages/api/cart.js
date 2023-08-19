const jwt = require("jsonwebtoken");
import Cart from "@/model/cart";
import dbConnect from "@/util/db";
import product from "../product";



dbConnect();

// console.log(Cart)


export default async (req,res)=>{
  switch(req.method){
      case "GET":
          await fetchUserCart(req,res)
          break
      case "PUT":
          await addProduct(req,res)  
          break   
      case "DELETE":
          await removeProduct(req,res) 
          break   
  }
}

function Authenticated(icomponent) {
  return (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "you must login" });
    }
    try {
      const { userid } = jwt.verify( authorization, process.env.JWT_TOKEN);
      // console.log(userid)
      req.userid = userid;
      return icomponent(req, res);
    } catch (error) {
      
      return res.status(500).json({ error: 'internal error' });
    }
  };
}

const fetchUserCart = Authenticated(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userid })
                .populate('products.product')
  res.status(200).json(cart);
  // console.log(cart)
});
const addProduct = Authenticated( async (req, res) => {
  const { productId, quantity } = req.body;
  
  const cart =  await Cart.findOne({user: req.userid})



  const pExists =  cart.products.some(pdoc => productId === pdoc.product.toString())
  
  // console.log("🚀 ~ file: cart.js:54 ~ addProduct ~ ̥:", pExists)

  


  if(pExists){
     await Cart.findOneAndUpdate(
         {_id:cart._id,"products.product":productId},
         {$inc:{"products.$.quantity":quantity}}
     )
  } else {
    const newProduct = {quantity, product:productId}
         await Cart.findOneAndUpdate(
             {_id:cart._id},
             {$push:{products:newProduct}}
             )
     }
     res.status(200).json({message:"product added to cart"})

});


const removeProduct = Authenticated(async(req, res) =>{
  const {productId} = req.body
  console.log(productId)

  const cart = await Cart.findOneAndUpdate(
    {user: req.userid},
    {$pull : {products: {product: productId}}},
    {new:true}
    ).populate("products.product")

res.status(200).json(cart.products)

} )
 