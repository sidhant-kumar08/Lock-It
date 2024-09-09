import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token; 


  if (!token) {
    return res.status(400).json({ message: "access denied" });
  }

  try { 

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
     
    next();

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

export default verifyToken;