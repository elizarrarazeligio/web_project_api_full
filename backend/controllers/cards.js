const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");

// ===== GET - Obtiene todos las tarjetas =================
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .orFail(() => {
      throw new NotFoundError("No se encontró ninguna tarjeta.");
    })
    .populate("owner likes")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

// ===== POST - Crea una nueva tarjeta ====================
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(async (card) => {
      card = await card.populate("owner");
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") err.statusCode = 400;
      next(err);
    });
};

// ===== PUT - Agrega like a tarjeta ======================
module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate("owner likes")
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

// ===== DELETE - Borra like de tarjeta ===================
module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("owner likes")
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

// ===== DELETE - Borra tarjeta por su ID =================
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new NotFoundError(`No se encontró la tarjeta con ID ${cardId}`);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
