// routes/auth.js
import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { signupValidator } from "../validators.js";
import { validationResult } from "express-validator";

const router = Router();

// sign up
router.post("/signup", signupValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 8);
    user = new User({ email, password: hashed });
    await user.save();
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    console.log(132)

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ access_token: token, token_type: "bearer" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
