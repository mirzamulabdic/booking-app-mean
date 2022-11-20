const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  propertyType: { type: String, required: true },
  rooms: { type: Number, required: true },
  beds: { type: Number, required: true },
  wifi: { type: Boolean, required: false },
  parking: { type: Boolean, required: false },
  pets: { type: Boolean, required: false },
  terrace: { type: Boolean, required: false },
  pool: { type: Boolean, required: false },
  address: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  city: { type: String, required: true },
  imagePaths: [{ type: String, required: true }],
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  price: { type: Number, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  owner: { type: String, ref: "User", required: true },
  ratings: [{ type: Number, required: false }],
});

module.exports = mongoose.model("Property", propertySchema);
