const express = require("express"),
      aws = require("aws-sdk"),
      config = require("config");


const auth = require("../middlewares/auth"),
      admin = require("../middlewares/admin"),
      { s3, upload } = require("../services/fileUpload");

const router = express();


const uploadMulti = upload.array("imageFiles", 4);

// get All images from S3
router.get("/image",[auth, admin], async (req, res) => {
  
  const data = await s3.listObjectsV2({
    Bucket: config.get("s3.Bucket")
  })
  .promise();
  res.send(data);
  
});

router.get("/image/:folder?/:key", async (req, res) => {
  const folder = req.params.folder;
  const Key = (folder? folder+"/" : "") + req.params.key;
  const data = await s3.getSignedUrlPromise('getObject', {
    Bucket: config.get("s3.Bucket"),
    Key //: "1571311733516_twitter.png"
  });
  res.send({publicUrl: data});
});

// upload multiple images to S3 using multer
router.post('/image/multi/', [auth, admin, uploadMulti], async (req, res) => {
  res.send({files: req.files});
});


// upload (put) object to S3: base64 data
router.post("/image", async (req, res) => {
  // new Buffer() is deprecated. Use Buffer.from, Buffer.alloc or Buffer.allocUnsafe instead.
  // const buf = new Buffer(req.body.fileInBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const buf = Buffer.from(req.body.fileInBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
  s3.putObject({
    Body: buf,
    ContentType: "image/png",
    Key: "time.png",
    Bucket: config.get("s3.Bucket")
  }, (err, data) => {
    if (err) { 
      console.log(err);
      console.log('Error uploading data: ', data); 
      res.status(500).send("error");
    }
    else res.send({ data });
  });
  
});



module.exports = router;