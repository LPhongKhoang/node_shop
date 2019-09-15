module.exports = function(req, res, next) {
  // pass auth middleware before come here
  if(req.user.isAdmin) {
    next();
  }else{
    res.status(403).send("You don't have permission for this resources");
  }
}