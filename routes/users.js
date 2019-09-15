const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
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
    password: passwordHash,
    isAdmin: req.body.isAdmin
  });

  await user.save();
  res.send({
    _id: user._id,
    email: user.email
  });
  
});

router.post("/login", async (req, res) => {
  validateReqBody(validate, req.body);

  // find user with email
  const user = await User.findOne({email: req.body.email});
  if(user) {
    // check password
    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    if(isCorrectPassword){
      // Generate token
      const token = user.generateAuthToken();
      // response
      return res.header('x-auth-token', token).send({
        message: "Login successfully",
        userInfo: _.pick(user, ["_id", "email", "isAdmin"])
      });
      
    }else{
      return res.status(400).send("Invalid email or password");
    }
  }else{
    return res.status(400).send("Invalid email or password");
  }
});

router.get("/me", auth, async (req, res) => {
  const currUser = await User.findById(req.user._id).select("-password");
  res.send(currUser);
});

// this endpoint need to be protected: only for user is superadmin
router.get("/:id", [auth, admin, validateObjectId] , async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if(user){
    res.send(user);
  }else{
    res.status(404).send("Not found user with given id");
  }
});

// this endpoint need to be protected: only for user is superadmin
// delete user
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).select("-password");
  if(user){
    res.send(user);
  }else{
    res.status(404).send("Not found user with given id");
  }
});

module.exports = router;