require("dotenv").config();
const express = require("express");
const cors = require("cors");

const reportsRouter = require("./routers/reports");
const usersRouter = require("./routers/users");
const chatRouter = require("./routers/chat");

const app = express();
app.use(express.json());
const port = process.env.PORT || 5172;

// setup cors
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins[0] !== "*" && allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/reports", reportsRouter);
app.use("/users", usersRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
  console.log(`[${process.env.NODE_ENV}] Server listening on port ${port}`);
});
