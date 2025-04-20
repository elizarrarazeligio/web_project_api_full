const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const bodyParser = require("body-parser");
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

app.use((req, res, next) => {
  req.user = {
    _id: "67dc71c22c60b5201be04c1d",
  };

  next();
});

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

app.use("/users", users);
app.use("/cards", cards);

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado." });
});
