const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String, required: false }],
});

//Provjerava da li vec postoji user kada unosimo u bazu
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
