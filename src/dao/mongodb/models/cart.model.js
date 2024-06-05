import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Export the Cart model
export const CartModel = model("carts", CartSchema);
