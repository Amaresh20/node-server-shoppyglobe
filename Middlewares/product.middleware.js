import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";
export function verifyToken(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "secretKey",
      function (err, verifiedToken) {
        if (err) {
          return res.status(403).json({ message: "Invalid jwt token" });
        }
        userModel.findById(verifiedToken._id).then((user) => {
          req.user = user;
          next();
        });
      }
    );
  } else {
    return res.status(404).json({ message: "token is not present" });
  }
}
