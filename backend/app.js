const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const bodyParser = require("body-parser");
const auth = require("./middlewares/auth");
const app = express();

const users = require("./routes/users");
const cards = require("./routes/cards");
const { createUser, login } = require("./controllers/users");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use(bodyParser.json());

// Rutas sin autenticación
app.post("/signin", login);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    }),
  }),
  createUser
);

// Middleware de autenticación
app.use(auth);

// Rutas que requieren autenticación
app.use("/users", users);
app.use("/cards", cards);

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado." });
});
