const Card = require("../models/card");
const { errorAtFail, typeOfError } = require("../utils/errors");

// ===== GET - Obtiene todos las tarjetas =================
module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = errorAtFail("No se encontró ninguna tarjeta.");
      throw error;
    })
    .populate("owner")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== POST - Crea una nueva tarjeta ====================
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error?.message });
    });
};

// ===== PUT - Agrega like a tarjeta ======================
module.exports.addLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== DELETE - Borra like de tarjeta ===================
module.exports.removeLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== DELETE - Borra tarjeta por su ID =================
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = errorAtFail(`No se encontró la tarjeta con ID ${cardId}`);
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};
