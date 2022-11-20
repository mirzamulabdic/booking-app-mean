const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const favoriteSchema = mongoose.Schema({
  propertyId: { type: String, ref: "Property", required: true },
  userBookedId: { type: String, required: true },
  existPropUser: { type: String, required: true, unique: true },
  imagePath: { type: String, required: true },
  propertyType: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
});

favoriteSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Favorite", favoriteSchema);
