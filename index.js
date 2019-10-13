// I. ========== Load packages =============
// create app server
const app = require("express")();
// const morgan = require("morgan");

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

// ****************** START SERVER =================
const port = process.env.PORT || 3000;
// start server
app.listen(port, ()=>{console.log(`Server starting at ${port}`)});

module.exports = app;