const users = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/", getUsers);
users.get("/:userId", getUserById);
users.get("/me", getCurrentUser);
users.patch("/me", updateUser);
users.patch("/me/avatar", updateAvatar);

module.exports = users;
