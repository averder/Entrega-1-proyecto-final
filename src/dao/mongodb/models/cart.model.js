import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  items: [
    {
      _id: false,
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

CartSchema.pre("find", function () {
  this.populate("items.product");
});

CartSchema.pre("findOne", function () {
  this.populate("items.product");
});

// Export the Cart model
export const CartModel = model("carts", CartSchema);
