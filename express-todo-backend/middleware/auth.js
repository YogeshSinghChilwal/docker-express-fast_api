// middleware/auth.js
import 'dotenv/config'
import  jwt  from "jsonwebtoken";
import User from "../models/User.js";


const auth = async (req, res, next) => {
  const header = req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload.sub should be user id
    const user = await User.findById(payload.sub).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user; // attach user to request
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
