const { ChatOpenAI } = require("langchain/chat_models/openai");

const streamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  streaming: false,
  verbose: true,
  temperature: 0,
});

const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  verbose: false,
  temperature: 0,
});

module.exports = { streamingModel, nonStreamingModel };
