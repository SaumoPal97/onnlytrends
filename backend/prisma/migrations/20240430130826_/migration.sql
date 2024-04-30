/*
  Warnings:

  - You are about to drop the column `name` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Trend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Trend" DROP COLUMN "name",
ALTER COLUMN "isSent" SET DEFAULT false;
