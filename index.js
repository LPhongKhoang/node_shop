// I. ========== Load packages =============
// create app server
const app = require("express")();
// const morgan = require("morgan");

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

// ****************** START SERVER =================
const port = process.env.PORT || 3009;

// start server
app.listen(port, ()=>{console.log(`Server running at ${port}`)});

module.exports = app;
