// I. ========== Load packages =============
const serverless = require("serverless-http");
// create app server
const app = require("express")();
// const morgan = require("morgan");

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

// ****************** START SERVER =================
// const port = process.env.PORT || 3009;
// // start server
// app.listen(port, ()=>{console.log(`Server starting at ${port}`)});

module.exports.handler = serverless(app);