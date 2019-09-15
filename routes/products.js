const express = require('express');
const router = express.Router();

const { Product, validate } = require('../models/product');
const validateObjectId = require("../middlewares/validateObjectId");
const validateReqBody = require("../utils/validateReqBody");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    }
  }),
  limits: {
    fileSize: 1024*1024*5, // 5mb
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

router.post("/", upload.single('productImg'), async (req, res) => {
  validateReqBody(validate, req.body);

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImg: req.file.path
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

router.patch("/:id", validateObjectId, async (req, res) => {
  const product = await Product.findByIdAndUpdate({_id: req.params.id}, {
    $set: req.body
  }, (err, res) => {res ? console.log('update product ok') : console.log('update product fail')});
  if(!product) {
    res.status(404).send("no product with the given id");
  }else{
    res.send(product);
  }
  
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const product = await Product.remove({_id: req.params.id});
  res.send(product);
});


module.exports = router;