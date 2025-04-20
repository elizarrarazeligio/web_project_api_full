const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/(w{3})?\.?.+/.test(value);
      },
      message: "Formato de URL inválido.",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
