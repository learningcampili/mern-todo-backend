const { check } = require("express-validator");
const { handleValidator } = require("../utils/handleValidator");

const validateRegister = [
  check("name", "Name is required").exists().notEmpty().trim(),
  check("email", "Email is required")
    .exists()
    .notEmpty()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Enter a valid email"),
  check("password", "Password is required")
    .exists()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),

  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

const validateLogin = [
  check("email", "Email is required")
    .exists()
    .notEmpty()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Enter a valid email"),
  check("password", "Password is required").exists().notEmpty(),

  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

module.exports = { validateRegister, validateLogin };
