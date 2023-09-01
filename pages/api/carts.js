const jwt = require("jsonwebtoken");

import dbConnect from "@/util/db";

import Authenticated from "@/util/Authenticated";
import Cart from "@/model/userCart";




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

const fetchUserCart = Authenticated(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userid })
                .populate('products.product')
  res.status(200).json(cart);
  // console.log(cart)
});
const addProduct = Authenticated( async (req, res) => {
  const { productId, quantity } = req.body;
  
  const cart =  await cart.findOne({user: req.userid})



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
  const cart = await Cart.findOneAndUpdate(
    {user: req.userid},
    {$pull : {products: {product: productId}}},
    {new:true}
    ).populate("products.product")

res.status(200).json(cart.products)

} )
 