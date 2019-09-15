const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024
  }
});

function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required()
  });
  return schema.validate(data);
}

module.exports.User = mongoose.model("User", userSchema);
module.exports.validate = validateUser;