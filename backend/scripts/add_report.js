require("dotenv").config;
const db = require("../services/db");
const prisma = db.getClient();

const report = {
  url: "",
  name: "",
  title: "",
  description: "",
  tags: "",
  imageUrl: "",
  namespace: "",
};

(async () => {
  // step 1: save report to reports table
  const savedReport = await prisma.report.create({ data: report });
  console.log("Saved report", savedReport.id, savedReport.title);
  // step 2: download report
  // step 3: load pdf
  // step 4: chunk pdf
  // step 5: save to embedding with namespace
  // step 6: call gemini to get top 10 trends for this report only
  // step 7: save trends to trends db with report id
  for (let trend of trends) {
    let mTrend = {
      ...trend,
      isSent: false,
      report: { connect: { id: savedReport.id } },
    };
    await prisma.trend.create({ data: mTrend });
  }
})();
