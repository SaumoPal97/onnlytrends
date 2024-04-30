require("dotenv").config;
const express = require("express");

const reportsRouter = require("./routes/reports");
const usersRouter = require("./routes/users");
const chatRouter = require("./routes/chat");

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/reports", reportsRouter);
app.use("/users", usersRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
  console.log(`[${process.env.NODE_ENV}] Server listening on port ${port}`);
});
