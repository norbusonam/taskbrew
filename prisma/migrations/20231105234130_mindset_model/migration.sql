-- CreateEnum
CREATE TYPE "DaysOfTheWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'BROWN');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "mindsetId" TEXT;

-- CreateTable
CREATE TABLE "Mindset" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Mindset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MindsetTimePeriod" (
    "id" TEXT NOT NULL,
    "day" "DaysOfTheWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mindsetId" TEXT NOT NULL,

    CONSTRAINT "MindsetTimePeriod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_mindsetId_fkey" FOREIGN KEY ("mindsetId") REFERENCES "Mindset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mindset" ADD CONSTRAINT "Mindset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindsetTimePeriod" ADD CONSTRAINT "MindsetTimePeriod_mindsetId_fkey" FOREIGN KEY ("mindsetId") REFERENCES "Mindset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
