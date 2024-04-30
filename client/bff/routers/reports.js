require("dotenv").config;
const express = require("express");
const bc = require("../services/backend_connector");

const router = express.Router();

router.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if (id) {
    console.log("here1", id);
    // get report by id
    const response = await bc.get(`/reports/${id}`);
    res.send({ data: response.data.data });
  } else {
    const tags = req.query.tags;
    console.log("here2", tags);
    if (tags) {
      // get reports by tag
      const response = await bc.get(`/reports`, `tags=${tags}`);
      res.send({ data: response.data.data });
    } else {
      // get all reports
      console.log("here3");
      const response = await bc.get(`/reports`);
      res.send({ data: response.data.data });
    }
  }
});

module.exports = router;
