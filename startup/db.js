const config = require("config");
const mongoose = require("mongoose");


module.exports = function() {
  let dbConStr = config.get("db.constr");
  const db_name = config.get("db.name");
  const db_username = config.get("db.user");
  const db_password = config.get("db.password");

  dbConStr = dbConStr
    .replace("<username>", db_username)
    .replace("<password>", db_password)
    .replace("<db_name>", db_name);

  mongoose
    .connect(dbConStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log("Connect to mongodb successfully..."))
    .catch(ex => console.error("Connect to mongodb failure...", ex));
};
