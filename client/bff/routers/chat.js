require("dotenv").config;
const express = require("express");

const router = express.Router();

router.post("/:namespace?", async (req, res) => {
  const namespace = req.params.namespace;

  // get question
  // add to prompt
  // load data from pinecone using namespace
  // return ai response
});

module.exports = router;
