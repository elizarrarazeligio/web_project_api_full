const User = require("../models/user");
const { errorAtFail, typeOfError } = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== GET - Obtiene todos los usuarios =================
module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = errorAtFail("No se encontró ningún usuario.");
      throw error;
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== GET - Obtiene usuario por su ID ==================
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = errorAtFail(`No se encontró usuario con ID ${userId}`);
      throw error;
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== POST - Crea un nuevo usuario =====================
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        const error = typeOfError(err);
        res.status(error.statusCode).send({ message: error?.message });
      })
  );
};

// ===== PATCH - Actualiza info de usuario ================
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== PATCH - Actualiza foto de usuario ================
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

// ===== POST - Login (Autenticación) =====================
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "1w",
      });
      res.status(200).send({ message: "Autenticación exitosa!", token });
    })
    .catch((err) => {
      const error = typeOfError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};
