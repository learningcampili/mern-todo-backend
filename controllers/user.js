const User = require("../models/User");
const CustomError = require("../models/CustomError");
const { hashPassword } = require("../utils/handlePassword");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("name email");
    if (!user) {
      throw new CustomError("User not Found", 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: await hashPassword(password),
      },
      { new: true }
    ).select("name email");

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserInfo,
  updateUser,
};
