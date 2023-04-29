const jwt = require("jsonwebtoken");

const User = require("../models/User");
const CustomError = require("../models/CustomError");
const { hashPassword, comparePassword } = require("../utils/handlePassword");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email: email });
    if (exists) {
      throw new CustomError("email is already in use", 400);
    }

    const user = new User({
      name,
      email,
      password: await hashPassword(password),
    });

    const userSaved = await user.save();

    res.status(201).json({ message: "new user created", userSaved });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "name email password role"
    );
    if (!user) {
      throw new CustomError("Invalid credentials", 404);
    }

    const isPasswordMatch = await comparePassword(password, user);

    if (!isPasswordMatch) {
      throw new CustomError("Invalid credentials", 401);
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        role: user.role,
        message: "login success",
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "logout success" });
};

// para ser usada desde el front
const isLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.json(false);
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.json(false);
  }
};

module.exports = {
  login,
  register,
  logout,
  isLoggedIn,
};
