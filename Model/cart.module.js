import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  stockQuantity: String,
  quantities: String,
});
const cartModel = mongoose.model("Carts", cartSchema);
export default cartModel;
