const { ConversationalRetrievalQAChain } = require("langchain/chains");
const { getVectorStore } = require("./vector-store");
const { getPineconeClient } = require("./pinecone-client");
const { streamingModel, nonStreamingModel } = require("./llm");
const {
  STANDALONE_QUESTION_TEMPLATE,
  QA_TEMPLATE,
} = require("./prompt-templates");

async function callChain(question, chatHistory, namespace = null) {
  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pineconeClient = await getPineconeClient();
    const vectorStore = await getVectorStore(pineconeClient, namespace);

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        returnSourceDocuments: true, //default 4
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
          template: STANDALONE_QUESTION_TEMPLATE,
        },
      }
    );

    const res = await chain.invoke({
      question: sanitizedQuestion,
      chat_history: chatHistory,
    });

    const sourceDocuments = res?.sourceDocuments;
    const firstTwoDocuments = sourceDocuments.slice(0, 2);
    const pageContents = firstTwoDocuments.map(
      ({ pageContent }) => pageContent
    );
    const final_res = { message: res.text, sources: pageContents };
    return final_res;
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}

module.exports = { callChain };
