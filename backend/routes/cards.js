const cards = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

cards.get("/", getCards);

cards.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);

cards.put(
  "/:cardId/likes",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  addLike
);

cards.delete(
  "/:cardId/likes",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  removeLike
);

cards.delete(
  "/:cardId",
  celebrate({ params: Joi.object().keys({ cardId: Joi.string().alphanum() }) }),
  deleteCard
);

module.exports = cards;
