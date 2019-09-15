const mongoose = require('mongoose');
module.exports = function(req, res, next) {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  }else{
    return res.status(400).send("Invalid object id");
  }
}