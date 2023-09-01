import Cart from "@/model/cart"
import Order from "@/model/Order";
import dbConnect from "@/util/db";
import Stripe from "stripe";
import {v4 as uuidV4 } from "uuid";
import jwt from 'jsonwebtoken'


dbConnect();
const stripe = Stripe(process.env.STRIPE_SECRET)

export default async(req, res) =>{
  const {paymentInfo} = req.body
  // console.log(paymentInfo)

      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ error: "you must login" });
      }
      try {
        const { userid } = jwt.verify( authorization, process.env.JWT_TOKEN);

        const cart = await Cart.findOne({user: userid}).populate("products.product")
        let price = 0

        cart.products.forEach(item =>{ price = price + item.quantity * item.product.price})


        const prevCustomer = await stripe.customers.list({ email:paymentInfo.email})

        const isCustomerExist = prevCustomer.data.length > 0 

        let customers

        if(!isCustomerExist){
          customers = await stripe.customers.create({
            email:paymentInfo.email,
            source: paymentInfo.id
          })

        }

        const charge = await stripe.charges.create({
          amount: price * 100,
          currency: 'INR',
          receipt_email:paymentInfo.email,
          customer: isCustomerExist ? prevCustomer.data[0].id : customers.id,
          description: `you purchased product | ${paymentInfo.email}`,
        },{
          idempotencyKey: uuidV4()
        });


        const order = await Order.create({
          user:userid,
          email:paymentInfo.email,
          total:price,
          products:cart.products
        })
         
        await Cart.findOneAndUpdate({
          _id: cart._id,
        },
        {$set: { products: []}}
        )
        res.status(200).json({msg: "payment was successful"})


      } catch (error) {
        return res.status(500).json({ error: 'error processing payment' });
      }
  }