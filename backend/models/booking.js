const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  propertyId: { type: String, ref: "Property", required: true },
  userBookedId: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  imagePath: {type: String, required: true},
  propertyType: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  days: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
