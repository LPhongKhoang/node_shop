const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("config");

const s3 = new aws.S3({
  accessKeyId: config.get("s3.accessKeyId"),
  secretAccessKey: config.get("s3.secretAccessKey"),
  Bucket: config.get("s3.Bucket")
});
const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.get("s3.Bucket"),
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
    metadata: (req, file, cb) => {
      cb(null, {fieldName: "Testing Metadata"});
    }
  }),
  
  limits: {
    fileSize: 1024*1024*5, // ~ 5e6 bytes ~ 5mb
  },
  fileFilter: (req, file, cb) => {
    if(["image/jpeg", "image/png"].includes(file.mimetype) ) {
      cb(null, true);
    }else{
      cb(new Error("Support only .jpeg and .png file extensions"), false);
    }
  }
});

module.exports = upload;