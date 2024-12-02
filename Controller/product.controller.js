import userModel from "../Model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import productModel from "../Model/product.model.js";
import cartModel from "../Model/cart.module.js";
export function register(req, res) {
  const { fullName, email, password } = req.body;
  userModel.findOne({ email }).then((data) => {
    if (data) {
      return res.status(403).json({ message: "User already exit" });
    } else {
      const newUser = new userModel({
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      newUser
        .save()
        .then((data) => {
          res.status(200).json({ message: data });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  });
}
export function login(req, res) {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((data) => {
      if (!data) {
        return res.status(403).json({ message: "User not registered" });
      }
      let validPassword = bcrypt.compareSync(password, data.password);
      if (!validPassword) {
        return res.status(403).json({ message: "Invalid password" });
      }
      let token = jwt.sign({ id: data._id }, "secretKey", { expiresIn: "10m" });
      res.send({
        user: {
          email: data.email,
          fullName: data.fullName,
        },
        accessToken: token,
      });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
}
//to show all cart items
export function fetchAllCart(req, res) {
  cartModel
    .find()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//to show one specific cart item
export function fetchOneCart(req, res) {
  const userId = req.params.id;
  cartModel
    .findById(userId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//post method -> add new cart item
export function createCart(req, res) {
  const { name, price, description, stockQuantity, quantities } = req.body;
  const newProduct = new cartModel({
    name,
    price,
    description,
    stockQuantity,
    quantities,
  });
  newProduct
    .save()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//update method -> update in a cart
export function updateOneCart(req, res) {
  const userId = req.params.id;
  cartModel
    .findByIdAndUpdate(userId, req.body, { new: true })
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//delete a cart -> delete http method
export function deleteOneCart(req, res) {
  const userId = req.params.id;
  cartModel
    .findByIdAndDelete(userId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//get all products ->get http method
export function fetchAllProduct(req, res) {
  productModel
    .find()
    .then((data) => {
      console.log("hello2", data);
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//get specific product with id ->get http method
export function fetchOneProduct(req, res) {
  const userId = req.params.id;
  productModel
    .findById(userId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//add new product -> post http method
export function createProduct(req, res) {
  const { name, price, description, stockQuantity } = req.body;
  const newProduct = new productModel({
    name,
    price,
    description,
    stockQuantity,
  });
  newProduct
    .save()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//update a product-> put http method
export function updateOneProduct(req, res) {
  const userId = req.params.id;
  productModel
    .findByIdAndUpdate(userId, req.body, { new: true })
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.send(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
//delete one product-> delete http method
export function deleteOneProduct(req, res) {
  const userId = req.params.id;
  productModel
    .findByIdAndDelete(userId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
}
