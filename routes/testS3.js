const express = require("express"),
      aws = require("aws-sdk"),
      config = require("config");


const auth = require("../middlewares/auth"),
      admin = require("../middlewares/admin"),
      { s3 } = require("../services/fileUpload");

const router = express();


// get All images from S3
router.get("/image",[auth, admin], async (req, res) => {
  
  const data = await s3.listObjectsV2({
    Bucket: config.get("s3.Bucket")
  })
  .promise();
  res.send(data);
  
});


module.exports = router;