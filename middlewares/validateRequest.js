module.exports = function(validate) {
  return (req, res, next) => {
    console.log("Request body: ", req.body);
    const { error } = validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      next(err);
    }
  };
};
