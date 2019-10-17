const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, email: this.email, isAdmin: this.isAdmin },
    config.get("jwtSecretKey"),
    // {
    //   expiresIn: "1h"
    // }
  );
};

function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .max(20)
      .required(),
    isAdmin: Joi.boolean()
  });
  return schema.validate(data);
}

module.exports.User = mongoose.model("User", userSchema);
module.exports.validate = validateUser;
