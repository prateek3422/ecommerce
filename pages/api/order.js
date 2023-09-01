
import Order from "@/model/userOrder";
import Authenticated from "@/util/Authenticated";
import dbConnect from "@/util/db";

dbConnect();

export default Authenticated(async (req, res) => {
  const order = await Order.find({ user: req.userid }).populate("products.product");
  res.status(200).json(order)

});
