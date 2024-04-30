require("dotenv").config;
const db = require("../services/db");
const prisma = db.getClient();
const fs = require("fs");
const { join } = require("path");

const { getChunkedDocsFromPDF, downloadPDF } = require("./pdf-loader");
const { embedAndStoreDocs } = require("./vector-store");
const { getPineconeClient } = require("./pinecone-client");
const { callChain } = require("./langchain");

const report = {
  url: "https://downloads.ctfassets.net/h67z7i6sbjau/1HLU7WxRs1Bb6EQSJa0nU5/95b2a5ac20666462c3835faebbc38b11/Pinterest_Predicts_Report_PDF_2024_ENGB.pdf",
  title: "Pinterest Predicts 2024",
  description:
    "482 million people use Pinterest to plan what’s next in their lives; their next home, their next meal, their next trip. This gives Pinterest unique insight into the future—what’s going to be really big, really soon.  Pinterest Predicts is a not-yet-trending report that shares emerging trends for the coming year. It’s your guide to what people will browse, try and buy next. Before you see it everywhere, see it here.",
  tags: ["technology", "design", "marketing"],
  imageUrl:
    "https://res.cloudinary.com/dadxjpvt6/image/upload/v1714472903/Screenshot_2024-04-30_at_10.49.58_AM_mdxnxm.png",
  namespace: "pinterest2024",
};

(async () => {
  try {
    const savedReport = await prisma.report.upsert({
      where: {
        namespace: report.namespace,
      },
      update: {},
      create: report,
    });
    let filePath = join(
      process.cwd(),
      "scripts",
      "reports",
      `${savedReport.title}.pdf`
    );
    console.log("Saved report", savedReport.id, savedReport.title);
    await downloadPDF(savedReport.url, filePath);

    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(filePath);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs, savedReport.namespace);
    console.log("Data embedded and stored in pine-cone index");

    const res = await callChain(
      `What are the top 5 trends from the report? Give a title and description of them
      `,
      "",
      savedReport.namespace
    );
    console.log("response", res);

    let trends = [];
    let finalTrendsData = res.message
      .split("\n")
      .filter((trend) => trend)
      .slice(1);
    finalTrendsData = finalTrendsData.map((trend) =>
      trend.trim().split(" ").slice(1).join(" ").replaceAll("*", "")
    );
    Array.from(Array(5)).forEach((x, i) => {
      trends.push({
        title: finalTrendsData[i * 2],
        description: finalTrendsData[i * 2 + 1],
      });
    });

    for (let trend of trends) {
      let mTrend = {
        ...trend,
        report: { connect: { id: savedReport.id } },
      };
      await prisma.trend.create({ data: mTrend });
    }
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
