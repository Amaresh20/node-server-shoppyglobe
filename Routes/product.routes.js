import {
  createCart,
  createProduct,
  deleteOneCart,
  deleteOneProduct,
  fetchAllCart,
  fetchAllProduct,
  fetchOneCart,
  fetchOneProduct,
  login,
  register,
  updateOneCart,
  updateOneProduct,
} from "../Controller/product.controller.js";
import express from "express";
import { verifyToken } from "../Middlewares/product.middleware.js";
export function productRoute(app) {
  app.use(express.json());
  app.post("/api/register", register);
  app.post("/api/login", login);
  app.get("/products", fetchAllProduct);
  app.get("/products/:id", fetchOneProduct);
  app.post("/product", createProduct);
  app.put("/product/:id", updateOneProduct);
  app.delete("/product/:id", deleteOneProduct);
  app.get("/cart", verifyToken, fetchAllCart);
  app.get("/cart/:id", verifyToken, fetchOneCart);
  app.post("/cart", verifyToken, createCart);
  app.put("/cart/:id", verifyToken, updateOneCart);
  app.delete("/cart/:id", verifyToken, deleteOneCart);
}
