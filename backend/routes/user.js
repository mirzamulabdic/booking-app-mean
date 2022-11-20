const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          firstname: fetchedUser.firstname,
          lastname: fetchedUser.lastname,
        },
        "secret_sifra_kodirana",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        firstname: fetchedUser.firstname,
        lastname: fetchedUser.lastname,
        userId: fetchedUser._id,
        token: token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

router.get("/:id", checkAuth, (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.status(200).json({firstname: user.firstname,lastname: user.lastname});
    } else {
      res.status(404).json({ message: "Not found!" });
    }
  });
});



module.exports = router;
