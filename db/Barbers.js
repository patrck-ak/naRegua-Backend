const mongoose = require("mongoose");

const Barber = mongoose.model("Barber", {
  name: String,
  storeName: String,
  email: String,
  password: String,
  availability: Array,
  shortAvaliability: String,
  rating: Number,
  cep: String,
});

module.exports = Barber;
