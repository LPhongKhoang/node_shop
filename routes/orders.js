const express = require('express');
const router = express.Router();
const { Product } = require("../models/product");
const { Order, validate }  = require("../models/order");
const validateReqBody = require("../utils/validateReqBody");
const validateObjectId = require("../middlewares/validateObjectId");

router.get("/", async (req, res) => {
  const orders = await Order.find().populate('product', 'name');
  res.send(orders);
});

router.post("/", async (req, res) => {
  validateReqBody(validate, req.body);
  // check if productId in req.body not in db
  const product = await Product.findById(req.body.productId);
  if(!product) {
    return res.status(400).send("Not found product with given id");
  }

  const order = new Order({
    product: req.body.productId,
    quantity: req.body.quantity
  });

  await order.save();
  res.send(order);
});

router.get("/:id", validateObjectId,async (req, res) => {
  // "populate": if product is gone (is deleted) ==> product just be null
  const order = await Order.findById(req.params.id).populate('product');
  if(!order){
    res.status(404).send("Not found order with given id");
  }else{
    res.send(order);
  }
});

router.patch("/:id", validateObjectId, async (req, res) => {

  const order = await Order.findByIdAndUpdate(req.params.id, {
    $set: req.body
  });

  if(!order) {
    res.status(404).send("Not found order with given id");
  }else{
    res.send(order);
  }
});

router.delete("/:id", validateObjectId , async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  if(!order) {
    res.status(404).send("Not found order with given id");
  }else{
    res.send(order);
  }
});


module.exports = router;