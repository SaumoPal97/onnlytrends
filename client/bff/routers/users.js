require("dotenv").config;
const express = require("express");
const bc = require("../services/backend_connector");

const router = express.Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const response = await bc.post("/users", { email, name });
  return response;
});

module.exports = router;
