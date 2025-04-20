const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return /https?:\/\/(w{3})?\.?.+/.test(value);
      },
      message: "Formato de URL inválido.",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
});

module.exports = mongoose.model("user", userSchema);
