require("dotenv").config;
const express = require("express");
const bc = require("../services/backend_connector");

const router = express.Router();

router.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if (id) {
    // get report by id
    const response = await bc.get(`/reports/${id}`);
    return [response];
  } else {
    const tags = req.query.tags;
    if (tags) {
      // get reports by tag
      const response = await bc.get(`/reports`, `tags=${tags}`);
      return response;
    } else {
      // get all reports
      const response = await bc.get(`/reports`, `tags=${tags}`);
      return response;
    }
  }
});

module.exports = router;
