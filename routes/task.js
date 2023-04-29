const express = require("express");
const {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getCurrentUserTasks,
  updateTask,
} = require("../controllers/task.js");
const { checkRole } = require("../middlewares/auth.js");
const { validateId } = require("../validators/task.js");

const router = express.Router();

router.get("/", checkRole(["Admin"]), getAllTasks);
router.post("/", createTask);
router.put("/:taskId", validateId, updateTask);
router.get("/myTasks", getCurrentUserTasks);
router.delete("/deleteAll", deleteAllTasks);
router.delete("/:taskId", validateId, deleteTask);

module.exports = router;
