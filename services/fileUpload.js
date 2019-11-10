const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("config");
const { s3 } = require("./aws");

const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.get("aws.s3.Bucket"),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, 'images/' + Date.now() + "_" + file.originalname);
    },
    metadata: (req, file, cb) => {
      cb(null, {fieldName: "Testing Metadata"});
    }
  }),
  
  limits: {
    fileSize: 1024*1024*100, // ~ 5e6 bytes ~ 5mb
  },
  fileFilter: (req, file, cb) => {
    if(["image/jpeg", "image/png", "video/x-m4v", "video/mp4"].includes(file.mimetype) ) {
      cb(null, true);
    }else{
      cb(new Error("Support only .jpeg and .png file extensions"), false);
    }
  }
});

const endpoint = s3.endpoint;

const getList = async () => {
  return data = await s3.listObjectsV2({
    Bucket: config.get("aws.s3.Bucket")
  })
  .promise();
}

const getPublicUrl = async (Key) => {
  return await s3.getSignedUrlPromise('getObject', {
    Bucket: config.get("aws.s3.Bucket"),
    Key //: "1571311733516_twitter.png"
  });
}

const getDownloadPublicUrl = async (Key) => {
  return await s3.getSignedUrlPromise('getObject', {
    Bucket: config.get("aws.s3.Bucket"),
    Key, //: "1571311733516_twitter.png",
   
    "ResponseContentDisposition": "attachment"
  });
}


const putFileToS3 = async (buf) => {
  return await s3.putObject({
    Body: buf,
    ContentType: "image/png",
    Key: "time.png",
    Bucket: config.get("aws.s3.Bucket")
  }).promise();
}


module.exports = {
  endpoint,
  upload,
  getList,
  getPublicUrl,
  getDownloadPublicUrl,
  putFileToS3,
}