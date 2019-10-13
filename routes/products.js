const express = require('express');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("config");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { Product, validate } = require('../models/product');
const validateObjectId = require("../middlewares/validateObjectId");
const validateReqBody = require("../utils/validateReqBody");

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: config.get("s3.accessKeyId"),
  secretAccessKey: config.get("s3.secretAccessKey"),
  Bucket: config.get("s3.Bucket")
});
const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.get("s3.Bucket"),
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    }
  }),
  limits: {
    fileSize: 1024*10, // ~ 10e3 bytes ~ 10kb
  },
  fileFilter: (req, file, cb) => {
    if(["image/jpeg", "image/png"].includes(file.mimetype) ) {
      cb(null, true);
    }else{
      cb(new Error("Support only .jpeg and .png file extensions"), false);
    }
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Note: should add validateReqBody as middleware (before save image to our Storage) (Not done yet)
router.post("/", [auth, admin, upload.single('productImg')], async (req, res) => {
  validateReqBody(validate, req.body);
  console.log("File: ", req.file);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImg: req.file.path || req.file.location
  });

  await product.save();

  res.send(product);

});

router.get("/:id", validateObjectId, async (req, res) => {

  const product = await Product.findById(req.params.id);
  if(product) {
    res.send(product);
  }else{
    res.status(404).send("Product not found");
  }

});

router.patch("/:id", [auth, admin, validateObjectId, upload.single("productImg")], async (req, res) => {
  const updateData = {};
  if(req.body.name) updateData["name"] = req.body.name;
  if(req.body.price) updateData["price"] = req.body.price;
  if(req.file) updateData["productImg"] = req.file.path || req.file.location;

  const product = await Product.findByIdAndUpdate({_id: req.params.id}, {
    $set: updateData
  }, (err, res) => {res ? console.log('update product ok') : console.log('update product fail')});
  if(!product) {
    res.status(404).send("no product with the given id");
  }else{
    res.send(product);
  }
  
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const product = await Product.remove({_id: req.params.id});
  res.send(product);
});


module.exports = router;