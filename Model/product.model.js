import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  stockQuantity: String,
});
const productModel = mongoose.model("Products", productSchema);
export default productModel;
