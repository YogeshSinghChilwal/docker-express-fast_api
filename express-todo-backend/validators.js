// validators.js
import { body } from "express-validator";

const signupValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short")
];

const todoValidator = [
  body("title").isLength({ min: 1 }).withMessage("Title required")
];

export  { signupValidator, todoValidator };
