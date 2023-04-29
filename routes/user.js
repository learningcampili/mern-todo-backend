const { Router } = require("express");

const { getUsers, getUserInfo, updateUser } = require("../controllers/user");

const { validateUpdateUser } = require("../validators/user");
const { checkAuth, checkRole } = require("../middlewares/auth");

const router = Router();

router.get("/", checkRole(["Admin"]), getUsers);

router.get("/me", getUserInfo);
router.put("/me", validateUpdateUser, updateUser);

module.exports = router;
