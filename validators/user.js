const { check } = require("express-validator");
const { handleValidator } = require("../utils/handleValidator");

const validateUpdateUser = [
  check("name").optional().notEmpty().trim(),
  check("email")
    .optional()
    .isEmail()
    .trim()
    .toLowerCase()
    .withMessage("Enter a valid email"),

  (req, res, next) => {
    handleValidator(req, res, next);
  },
];

module.exports = { validateUpdateUser };
