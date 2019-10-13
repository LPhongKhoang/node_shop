require("express-async-errors"); // just need to load for catch all unhandle promise rejection happen inside express piplines
const express = require("express");

// Define routes
const productRoutes = require('../routes/products');
const orderRoutes = require("../routes/orders");
const userRoutes = require("../routes/users");
const testCorsRoutes = require("../routes/testCors");
const testS3Routes = require("../routes/testS3");

module.exports = function(app) {
  // II. ========== Use middleware for pre-processing data, works =============
  // app.use(morgan("dev"));  
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  //III. Specific Route Handler
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/testCors", testCorsRoutes);
  app.use("/api/testS3", testS3Routes);

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

}