const express = require("express"),
      config = require("config");


const auth = require("../middlewares/auth"),
      admin = require("../middlewares/admin"),
      { getSubscriptionAttributes, sendEmail, template } = require("../services/sendEmail");

const router = express();



// Send email to specific subscriber users with message body
router.post("/send-email",[auth, admin], async (req, res) => {
  // const targetArn = "arn:aws:sns:ap-southeast-1:769638883142:Krisshop:3023110c-43b9-4cad-b0c7-1b50bb3f7537";
  const subject = "Hello from LongPK";
  const message = template;
  const data = await sendEmail(subject, message);
  // const data = await getList();
  res.send(data);
  
});

router.get("/subcribers", [auth, admin], async (req, res) => {
  const arn = "arn:aws:sns:ap-southeast-1:769638883142:Krisshop:3023110c-43b9-4cad-b0c7-1b50bb3f7537";
  const data = await getSubscriptionAttributes(arn);
  res.send(data);
});

module.exports = router;