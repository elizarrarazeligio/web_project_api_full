const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== GET - Obtiene todos los usuarios =================
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario.");
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

// ===== GET - Obtiene usuario por su ID ==================
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`No se encontró usuario con ID ${userId}`);
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

// ===== GET - Obtiene los datos del usuario actual =======
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No se encontró ningún usuario.");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

// ===== POST - Crea un nuevo usuario =====================
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch(next)
  );
};

// ===== PATCH - Actualiza info de usuario ================
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about)
    throw new BadRequestError("No se permiten campos vacíos.");

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

// ===== PATCH - Actualiza foto de usuario ================
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) throw new BadRequestError("Este campo no puede estar vacío.");

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") err.statusCode = 400;
      next(err);
    });
};

// ===== POST - Login (Autenticación) =====================
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      res.status(200).send({ message: "Autenticación exitosa!", token });
    })
    .catch(next);
};
