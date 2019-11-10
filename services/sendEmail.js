const config = require("config");
const { sns } = require("./aws");


exports.getSubscriptionAttributes = async (arn) => {
  return await sns.getSubscriptionAttributes({
    SubscriptionArn: arn
  }).promise();
}

exports.sendEmail = async (subject, message) => {
  return await sns.publish({
    Message: message,
    Subject: subject,
    // TargetArn: targetArn,
    TopicArn: config.get("aws.sns.topicArn")
  }).promise();
}

exports.template = 
`Hi Admin,

You received a new feedback from [ABC] with title [CDE] 

 

Please view the feedback in ...... https://google.com

 

KrisShop Back-end System`;