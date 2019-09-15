const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    max: 1000,
    default: 1
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

function validateOrder(data) {
  const schema = Joi.object({
    productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    quantity: Joi.number().max(1000)
  });

  return schema.validate(data);
}

module.exports.Order = mongoose.model("Order", schema);
module.exports.validate = validateOrder;