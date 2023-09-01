import { default as mongoose } from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        quantity: { type: Number, default: 1 },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
