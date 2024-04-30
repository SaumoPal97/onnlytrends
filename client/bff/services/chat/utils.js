function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatMessage(message) {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
}

module.exports = { delay, formatMessage };
