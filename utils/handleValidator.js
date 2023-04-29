const { validationResult } = require("express-validator");
const CustomError = require("../models/CustomError");

const handleValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    throw new CustomError(err.errors[0].msg, 400);
    next();
    // res.status(400)
    // res.send({ errors: err.array() })
  }
};
module.exports = { handleValidator };
