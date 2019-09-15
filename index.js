// I. ========== Load packages =============
require("express-async-errors"); // just need to load for catch all unhandle promise rejection happen inside express piplines
const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
// create app server
const app = express();
// const morgan = require("morgan");
// check environment variable jwtSecretKey is set
if(!config.has("jwtSecretKey")) {
  console.error("FATAl ERROR: need to set node_shop_jwtSecretKey env variables");
  process.exit(1);
}

// connect to mongodb
if(!config.has("db.user") || !config.has("db.password")) {
  console.error("FATAl ERROR: need to set db_user and db_password env variables");
  process.exit(1);
}
let dbConStr = config.get("db.constr");
const db_name = config.get("db.name");
const db_username = config.get("db.user");
const db_password = config.get("db.password");

dbConStr = dbConStr.replace("<username>", db_username)
    .replace("<password>", db_password)
    .replace("<db_name>", db_name);


mongoose.connect(dbConStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(()=>console.log("Connect to mongodb successfully..."))
  .catch((ex)=>console.error("Connect to mongodb failure...", ex));
 

// Define routes
const productRoutes = require('./routes/products');
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const testCorsRoutes = require("./routes/testCors");

// II. ========== Use middleware for pre-processing data, works =============
// app.use(morgan("dev"));  
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handle Cors (Cross Origin Resouce Sharing) (request from browser only)
app.use((req, res, next) => {
  res.header("Access-Controler-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // check preflight request
  if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", 
      "GET, POST, PUT, PATCH, DELETE, HEAD");
    res.status(204).send({});
  }

  next();
  
})

//III. Specific Route Handler
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/testCors", testCorsRoutes);

// IV. Catch Error in express
//1. catch unhandle route
app.use((req, res, next) => {
  const err = new Error("api not found");
  err.status = 404;
  next(err);
});

//2. catch all error happens in express route pipelines
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message
    }
  })
});

// ****************** START SERVER =================
const port = process.env.PORT || 3000;
// start server
app.listen(port, ()=>{console.log(`Server starting at ${port}`)})