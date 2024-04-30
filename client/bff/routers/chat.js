require("dotenv").config;
const express = require("express");
const { callChain } = require("../services/chat/langchain");

const router = express.Router();

const formatMessage = (message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

router.post("/:namespace?", async (req, res) => {
  const namespace = req.params.namespace;
  const body = req.body;
  const messages = body.messages ?? [];
  console.log(messages[messages.length - 1]);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1]?.content;

  if (!question) {
    res.send(400).message("Bad Request");
  }

  console.log("Chat history ", question, formattedPreviousMessages.join("\n"));
  try {
    const response = await callChain(
      question,
      formattedPreviousMessages.join("\n"),
      namespace
    );

    res.send({ data: response });
  } catch (error) {
    console.error("Internal server error ", error);
    res.status(400).message("Api call failed");
  }
});

module.exports = router;
