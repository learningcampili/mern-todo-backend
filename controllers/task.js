const Task = require("../models/Task.js");
const CustomError = require("../models/CustomError.js");

const createTask = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title } = req.body;

    const task = new Task({
      title,
      user: id,
    });

    const savedTask = await task.save();

    res.json(savedTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    if (task.user.toString() !== req.user.id) {
      throw new CustomError("You are not allow to do this", 401);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        completed,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).populate({
      path: "user",
      select: "name email",
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate({
      path: "user",
      select: "name email",
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    if (task.user.toString() !== req.user.id) {
      throw new CustomError("You are not allow to do this.", 401);
    }
    await Task.findByIdAndDelete(taskId);
    res.json("Task Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

const deleteAllTasks = async (req, res, next) => {
  try {
    const { deletedCount } = await Task.deleteMany({ user: req.user.id });

    if (deletedCount === 0) {
      throw new CustomError("No Tasks for this user to delete", 404);
    }
    res.json(`${deletedCount} Tasks deleted successfully`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteAllTasks,
  deleteTask,
  updateTask,
  getCurrentUserTasks,
  getAllTasks,
  createTask,
};
