const express = require("express");

const Property = require("../models/property");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).array("files"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const files = req.files;
    const filesName = [];

    files.forEach((img) => {
      filesName.push(url + "/images/" + img.filename);
    });

    const property = new Property({
      propertyType: req.body.propertyType,
      rooms: req.body.rooms,
      beds: req.body.beds,
      wifi: req.body.wifi,
      parking: req.body.parking,
      pets: req.body.pets,
      terrace: req.body.terrace,
      pool: req.body.pool,
      address: req.body.address,
      state: req.body.state,
      zip: req.body.zip,
      city: req.body.city,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
      price: req.body.price,
      imagePaths: filesName,
      ownerId: req.userData.userId,
      owner: req.userData.firstname + " " + req.userData.lastname,
    });

    property.save().then((result) => {
      res.status(201).json({
        message: "Post added successfully",
        property: {
          ...result,
          id: result._id,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const propertyQuery = Property.find();
  let fetchedProperties;
  if (pageSize && currentPage) {
    propertyQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  propertyQuery
    .find()
    .then((documents) => {
      fetchedProperties = documents;
      return Property.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        properties: fetchedProperties,
        maxProperties: count,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Property.findById(req.params.id).then((property) => {
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.get("/owner/:id", checkAuth, (req, res, next) => {
  Property.find({ ownerId: req.params.id }).then((property) => {
    if (property) {
      res.status(200).json({
        message: "Owner properties fetched successfully!",
        properties: property,
      });
    } else {
      res.status(404).json({ message: "Property not found!" });
    }
  });
});

router.get("/ownerId", checkAuth, (req, res, next) => {
  console.log(req.body);
  // Property.find({ _id: { $in: [req.params.id] } }).then((property) => {
  //   if (property) {
  //     res.status(200).json({
  //       message: "Owner properties fetched successfully!",
  //       properties: property,
  //     });
  //   } else {
  //     res.status(404).json({ message: "Property not found!" });
  //   }
  // });
});

router.put("/:id", (req, res, next) => {
  Property.updateOne(
    { _id: req.params.id },
    { $push: { ratings: req.body.rating } }
  ).then((result) => {
    res.status(200).json({ message: "Update Successful!" });
  });
});

router.delete("/:id", (req, res, next) => {
  Property.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Property deleted!" });
  });
});

module.exports = router;
