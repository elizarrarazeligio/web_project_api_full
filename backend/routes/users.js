const users = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/", getUsers);
users.get("/:userId", getUserById);
users.patch("/me", updateUser);
users.patch("/me/avatar", updateAvatar);

module.exports = users;
