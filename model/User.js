import jwt from "jsonwebtoken";
import { default as mongoose } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
    // token: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.getJwtToken = async function () {
//   try {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, {
//       expiresIn: process.env.JWT_Exp,
//     });
//     this.tokens = this.tokens.concat({ token: token });

//     await this.token.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
