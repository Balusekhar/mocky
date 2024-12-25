/*
  Warnings:

  - You are about to drop the column `feedback` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "feedback";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_interviewId_key" ON "Feedback"("interviewId");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
