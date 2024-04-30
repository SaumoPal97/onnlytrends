require("dotenv").config;
const express = require("express");
const db = require("../services/db");

const router = express.Router();
const prisma = db.getClient();

router.get("/", async (req, res) => {
  // get all users
  const users = await prisma.user.findMany();
  res.send({ data: users });
});

router.post("/", async (req, res) => {
  // upsert user
  const email = req.body.email;
  const name = req.body.name;

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      name,
    },
  });

  res.send({ data: [user] });
});

module.exports = router;
