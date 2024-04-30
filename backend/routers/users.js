require("dotenv").config;
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // get all users
  const users = await prisma.user.findMany();
  return users;
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

  return user;
});

module.exports = router;
