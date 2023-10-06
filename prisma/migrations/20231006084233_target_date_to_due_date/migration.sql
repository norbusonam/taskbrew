/*
  Warnings:

  - You are about to drop the column `targetDate` on the `Task` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "targetDate",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;
