const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const users = require("./routes/users");
const cards = require("./routes/cards");

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

app.use("/users", users);
app.use("/cards", cards);

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado." });
});
