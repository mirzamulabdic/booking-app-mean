const express = require("express");

const Favorite = require("../models/favorite");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  const favorite = new Favorite({
    propertyType: req.body.propertyType,
    city: req.body.city,
    imagePath: req.body.imagePath,
    price: req.body.price,
    existPropUser: req.body.existPropUser,
    userBookedId: req.body.userBookedId,
    propertyId: req.body.propertyId,
  });

  favorite
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Booked successfully",
        favorite: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", checkAuth, (req, res, next) => {
  const userId = String(req.params.id);
  Favorite.find({ userBookedId: userId.toString() }).then((favorite) => {
    if (favorite) {
      res.status(200).json({
        message: "Favorites fetched successfully!",
        favorites: favorite,
      });
    } else {
      res.status(404).json({ message: "Favorite property not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Favorite.deleteMany({ userBookedId: req.params.id }).then((result) => {
    res.status(200).json({ message: "Favorites deleted!" });
  });
});

module.exports = router;
