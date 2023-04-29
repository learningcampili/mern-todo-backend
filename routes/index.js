const { Router } = require("express");
const { checkAuth } = require("../middlewares/auth");
const authRoutes = require("./auth.js");
const usersRoutes = require("./user.js");
const tasksRoutes = require("./task.js");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", checkAuth, usersRoutes);
router.use("/tasks", checkAuth, tasksRoutes);
module.exports = router;
