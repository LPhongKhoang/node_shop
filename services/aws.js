const aws = require("aws-sdk");
const config = require("config");

aws.config.update({
  accessKeyId: config.get("aws.accessKeyId"),
  secretAccessKey: config.get("aws.secretAccessKey"),
  signatureVersion:"v4",
  region: "ap-southeast-1"
});

const s3 = new aws.S3({
  apiVersion: "latest" // curr version is 2006-03-01
});

const sns = new aws.SNS({
  apiVersion: "lastest", // crr versiono is 2010-03-31
});

module.exports = {
  s3,
  sns
}