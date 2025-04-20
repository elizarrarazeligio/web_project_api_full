const users = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/", getUsers);
users.get("/:userId", getUserById);
users.post("/", createUser);
users.patch("/me", updateUser);
users.patch("/me/avatar", updateAvatar);

module.exports = users;
