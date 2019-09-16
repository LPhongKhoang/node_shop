const axios = require("axios");
const router = require("express").Router();

// Cors error is just in Browser
router.get("/movies", async (req, res) => {
  const movies = await axios.get("https://longpk-mosh-vidly.herokuapp.com/api/movies");
  res.send(movies.data);
})

module.exports = router;
