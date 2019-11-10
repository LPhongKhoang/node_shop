const express = require("express"),
      config = require("config");


const auth = require("../middlewares/auth"),
      admin = require("../middlewares/admin"),
      { endpoint, upload, getList, getPublicUrl, putFileToS3, getDownloadPublicUrl } = require("../services/fileUpload");

const router = express();


const uploadMulti = upload.array("imageFiles", 4);

// get All images from S3
router.get("/image",[auth, admin], async (req, res) => {
  
  const data = await getList();
  res.send(data);
  
});

router.get("/image/:folder?/:key", async (req, res) => {
  const folder = req.params.folder;
  const Key = (folder? folder+"/" : "") + req.params.key;
  const data = await getPublicUrl(Key);
  res.send({data: {publicUrlFile: data}});
});

router.get("/image/linkdownload/:folder?/:key", async (req, res) => {
  const folder = req.params.folder;
  const Key = (folder? folder+"/" : "") + req.params.key;
  const data = await getDownloadPublicUrl(Key);
  res.send({data: {publicUrlFile: data}});
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
  console.log(buf.byteLength);

  const data = await putFileToS3(buf);
  res.send(data);
  
});

// find endpoint of S3 service
router.get("/s3Endpoint", (req, res) => {
  res.send({s3Enpoint: endpoint });
})



module.exports = router;