/*
  Warnings:

  - A unique constraint covering the columns `[creatorId,id]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Todo_creatorId_id_key" ON "Todo"("creatorId", "id");
