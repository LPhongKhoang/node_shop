const config = require('config');

module.exports = function() {

  // check s3 key is set to ENV or not
  if( !config.get("aws.accessKeyId") ||
      !config.get("aws.secretAccessKey") ||
      !config.get("aws.s3.Bucket")
  ) {
    console.error(`FATAl ERROR: need to set 
    node_shop_s3_accessKeyId 
    node_shop_s3_secretAccessKey 
    node_shop_s3_Bucket 
    env variables`);
    process.exit(1);
  }
  
  // check environment variable jwtSecretKey is set
  if(!config.get("jwtSecretKey")) {
    console.error("FATAl ERROR: need to set node_shop_jwtSecretKey env variables");
    process.exit(1);
  }
  
  // check config for connecting to MongoDb
  if(process.env.NODE_ENV==="production" && (!config.get("db.user") || !config.get("db.password"))) {
    console.error("FATAl ERROR: need to set db_user and db_password env variables");
    process.exit(1);
  }
}