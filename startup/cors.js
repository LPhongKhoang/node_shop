module.exports = function(app) {
  // Handle Cors (Cross Origin Resouce Sharing) (request from browser only)
  app.use((req, res, next) => {
    res.header("Access-Controler-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // check preflight request
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, HEAD"
      );
      res.status(204).send({});
    }

    next();
  });
};
