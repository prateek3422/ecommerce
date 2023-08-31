import User from "@/model/User";
import dbConnect from "@/util/db";
import valid from "@/util/valid";
import bcrypt from "bcrypt";



export default async function post(req, res) {

  try {
    const { name, email, password } = req.body;
    await dbConnect()

    // console.log(req.body)

    const errmsg =  valid(name, email, password)
    // console.log(errmsg)
    if(errmsg){
        return res.status(400).json({err: errmsg})
    }

    const user = await User.findOne({ email });
    // console.log(user)
    if(user) return res.status(400).json({err: 'This email already exists.'})

    
    const passhash = await bcrypt.hash(password, 12);
    
    const newUser = await User.create({
      name,
      email,
      password:passhash,
    });
    
    const cart = await  Cart.create({user:newUser._id})


      res.status(200).json({
        message: "successful",
        passhash,
        cart
      });

  } catch (error) {
    // console.log(error);
  return  res.status(400).json({msg:'Sorry. Please Login Again or Contact Us!'});
  }
}
