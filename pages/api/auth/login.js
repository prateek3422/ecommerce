import User from "@/model/User";
import dbConnect from "@/util/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function post(req, res) {
  try {
    dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Please fill all filds" });
    }

    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { name, role, email } = user;
        const token = jwt.sign({ userid: user._id }, process.env.JWT_TOKEN);
        res
          .status(201)
          .json({
            message: "login success",
            token,
            user: { name, role, email },
          });
      } else {
        return res.status(402).json({ error: "invalid details" });
      }
    } else {
      return res.status(500).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(500).json({ err: error });
  }
}
