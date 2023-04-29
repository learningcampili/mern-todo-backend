const User = require("../models/User");
const CustomError = require("../models/CustomError");
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new CustomError("Unauthorize", 401);
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized, invalid token", 401);
    }

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

const checkRole = (roles) => async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError("You are not authenticated", 500);
    }

    const user = await User.findById(req.user.id);

    if (!roles.includes(user.role)) {
      throw new CustomError("You are not authorized", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuth,
  checkRole,
};
