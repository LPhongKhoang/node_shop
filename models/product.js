const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  productImg: {
    type: String
  }
}); 

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    price: Joi.number().min(0).max(1000).required()
  });
  return schema.validate(product);
} 



module.exports.Product = mongoose.model("Product", schema);
module.exports.validate = validateProduct;