require("dotenv").config;
const express = require("express");
const db = require("../services/db");

const router = express.Router();
const prisma = db.getClient();

router.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if (id) {
    // get report by id
    const report = await prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        trends: true,
      },
    });
    return [report];
  } else {
    const tags = req.query.tags;
    if (tags) {
      // get reports by tag
      const reports = await prisma.report.findAll({
        where: {
          tags: { hasSome: tags.split(",") },
        },
        include: {
          trends: true,
        },
      });
      return reports;
    } else {
      // get all reports
      const reports = await prisma.report.findMany({
        include: {
          trends: true,
        },
      });
      return reports;
    }
  }
});

module.exports = router;
