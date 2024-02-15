const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save();

  res.send("hello");
});

module.exports = router;
