/*
  Warnings:

  - You are about to drop the column `checkListItem` on the `UserChecklistItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChecklistItem" DROP CONSTRAINT "UserChecklistItem_checkListItem_fkey";

-- DropIndex
DROP INDEX "UserChecklistItem_checkListItem_idx";

-- AlterTable
ALTER TABLE "UserChecklistItem" DROP COLUMN "checkListItem";

-- CreateTable
CREATE TABLE "_UserChecklistItem_checkListItem" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserChecklistItem_checkListItem_AB_unique" ON "_UserChecklistItem_checkListItem"("A", "B");

-- CreateIndex
CREATE INDEX "_UserChecklistItem_checkListItem_B_index" ON "_UserChecklistItem_checkListItem"("B");

-- AddForeignKey
ALTER TABLE "_UserChecklistItem_checkListItem" ADD CONSTRAINT "_UserChecklistItem_checkListItem_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChecklistItem_checkListItem" ADD CONSTRAINT "_UserChecklistItem_checkListItem_B_fkey" FOREIGN KEY ("B") REFERENCES "UserChecklistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
