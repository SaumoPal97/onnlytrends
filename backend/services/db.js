require("dotenv").config;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DB {
  getClient() {
    return prisma;
  }
}

const db = new DB();
module.exports = db;
