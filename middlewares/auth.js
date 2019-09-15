const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

module.exports = async function(req, res, next) {
  try{
    const token = req.header('x-auth-token');
    if(!token) {
      return res.status(400).send("No token provided");
    }
    const payload = jwt.verify(token, config.get("jwtSecretKey"));
    const user = await User.findById(payload._id);
    if(!user) return res.status(401).send("Invalid token");
    
    req.user =  payload;
    next();
  }catch(ex) {
    res.status(401).send("Invalid token");
  }
}