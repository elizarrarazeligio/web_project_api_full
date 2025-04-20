const cards = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

cards.get("/", getCards);
cards.post("/", createCard);
cards.put("/:cardId/likes", addLike);
cards.delete("/:cardId/likes", removeLike);
cards.delete("/:cardId", deleteCard);

module.exports = cards;
