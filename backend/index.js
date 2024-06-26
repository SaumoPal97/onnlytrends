require("dotenv").config;
const express = require("express");

const reportsRouter = require("./routers/reports");
const trendsRouter = require("./routers/trends");
const usersRouter = require("./routers/users");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/reports", reportsRouter);
app.use("/trends", trendsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`[${process.env.NODE_ENV}] Server listening on port ${port}`);
});
