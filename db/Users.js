const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  type: String,
  cep: String,
});

module.exports = User;
