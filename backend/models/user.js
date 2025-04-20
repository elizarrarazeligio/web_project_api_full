const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) return Promise.reject(new Error("Incorrect password or email."));
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched)
        return Promise.reject(new Error("Incorrect password or email."));
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
