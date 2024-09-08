/*
  Warnings:

  - You are about to drop the `_UserChecklistItem_checkListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserChecklistItem_checkListItem" DROP CONSTRAINT "_UserChecklistItem_checkListItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserChecklistItem_checkListItem" DROP CONSTRAINT "_UserChecklistItem_checkListItem_B_fkey";

-- AlterTable
ALTER TABLE "UserChecklistItem" ADD COLUMN     "checkListItem" UUID;

-- DropTable
DROP TABLE "_UserChecklistItem_checkListItem";

-- CreateIndex
CREATE INDEX "UserChecklistItem_checkListItem_idx" ON "UserChecklistItem"("checkListItem");

-- AddForeignKey
ALTER TABLE "UserChecklistItem" ADD CONSTRAINT "UserChecklistItem_checkListItem_fkey" FOREIGN KEY ("checkListItem") REFERENCES "CheckListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
