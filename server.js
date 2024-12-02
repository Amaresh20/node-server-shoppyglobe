import express from "express";
import { productRoute } from "./Routes/product.routes.js";
import mongoose from "mongoose";
const app = express();
app.listen(3000, () => {
  console.log("server running at port 3000");
});
productRoute(app);
mongoose.connect("mongodb://localhost:27017");
const db = mongoose.connection;
db.on("open", () => {
  console.log("db is connected");
});
db.on("error", () => {
  console.log("db is not connected");
});
