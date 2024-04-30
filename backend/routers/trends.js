require("dotenv").config;
const express = require("express");
const db = require("../services/db");

const router = express.Router();
const prisma = db.getClient();

router.get("/:id?", async (req, res) => {
  const isSent = req.query.isSent == "true" ? true : false;
  if (isSent) {
    // get trends by isSent
    const trends = await prisma.trend.findAll({
      where: {
        isSent,
      },
      include: {
        report: true,
      },
    });
    return trends;
  } else {
    // get all trends
    const trends = await prisma.trend.findMany({
      include: {
        report: true,
      },
    });
    return trends;
  }
});

router.post("/update-many", async (req, res) => {
  // get all ids and update many
  const ids = req.body.ids;
  const updateTrends = await prisma.trend.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      isSent: true,
    },
  });
  return updateTrends;
});

module.exports = router;
