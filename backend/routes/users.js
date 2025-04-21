const users = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

users.get("/", getUsers);

users.get("/me", getCurrentUser);

users.get(
  "/:userId",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  getUserById
);

users.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser
);

users.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri(),
    }),
  }),
  updateAvatar
);

module.exports = users;
