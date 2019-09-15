module.exports = function(validate, data) {
  const { error } = validate(data);
  if(error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }
}