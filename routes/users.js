const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, validate } = require("../models/user");
const validateReqBody = require("../utils/validateReqBody");
const validateObjectId = require("../middlewares/validateObjectId");

// for user sign up
router.post("/signup", async (req, res) => {
  // validate req.body
  validateReqBody(validate, req.body);

  // check email exist or not
  let user = await User.findOne({email: req.body.email});
  if(user) {
    return res.status(409).send("The email is already exist");
  }

  // hash password
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  // create new user
  user = new User({
    email: req.body.email,
    password: passwordHash
  });

  await user.save();
  res.send({
    _id: user._id,
    email: user.email
  });
  
});

router.post("/login", (req, res) => {
  
});

// this endpoint need to be protected: only for user is superadmin
router.get("/:id", validateObjectId , async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user){
    res.send(user);
  }else{
    res.status(404).send("Not found user with given id");
  }
});

// this endpoint need to be protected: only for user is superadmin
// delete user
router.delete("/:id", validateObjectId, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(user){
    res.send(user);
  }else{
    res.status(404).send("Not found user with given id");
  }
});

module.exports = router;