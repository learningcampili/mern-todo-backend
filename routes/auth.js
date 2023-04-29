const { Router } = require("express");

const { login, register, logout, isLoggedIn } = require("../controllers/auth");

const { validateRegister, validateLogin } = require("../validators/auth");

const router = Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.get("/logout", logout);
router.get("/isloggedin", isLoggedIn);

module.exports = router;
