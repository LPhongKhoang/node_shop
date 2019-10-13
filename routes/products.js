const express = require('express');

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { Product, validate } = require('../models/product');
const validateObjectId = require("../middlewares/validateObjectId");
const validateReqBody = require("../utils/validateReqBody");
const { upload } = require("../services/fileUpload");

const router = express.Router();
const singleUpload = upload.single("productImg");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Note: should add validateReqBody as middleware (before save image to our Storage) (Not done yet)
router.post("/", [auth, admin, singleUpload], async (req, res) => {
  validateReqBody(validate, req.body);
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

router.patch("/:id", [auth, admin, validateObjectId, singleUpload], async (req, res) => {

  validateReqBody(validate, req.body);

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