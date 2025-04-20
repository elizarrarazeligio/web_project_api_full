const users = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/", getUsers);
users.get("/:userId", getUserById);
users.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    }),
  }),
  createUser
);
users.patch("/me", updateUser);
users.patch("/me/avatar", updateAvatar);

module.exports = users;
