const express = require("express");

const Booking = require("../models/booking");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  const booking = new Booking({
    propertyType: req.body.propertyType,
    address: req.body.address,
    city: req.body.city,
    startingDate: req.body.startingDate,
    endingDate: req.body.endingDate,
    imagePath: req.body.imagePath,
    price: req.body.price,
    days: req.body.days,
    userBookedId: req.body.userBookedId,
    propertyId: req.body.propertyId,
  });

  booking.save().then((result) => {
    res.status(201).json({
      message: "Booked successfully",
      booking: {
        ...result,
        id: result._id,
      },
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  const userId = String(req.params.id);
  Booking.find({ userBookedId: userId.toString() }).then((booking) => {
    if (booking) {
      res.status(200).json({
        message: "Bookings fetched successfully!",
        bookings: booking,
      });
    } else {
      res.status(404).json({ message: "Booking not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Booking.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Booking canceled!" });
  });
});

module.exports = router;
