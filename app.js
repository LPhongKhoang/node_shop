// create app server
const app = require("express")();
// const morgan = require("morgan");

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);


module.exports = app;