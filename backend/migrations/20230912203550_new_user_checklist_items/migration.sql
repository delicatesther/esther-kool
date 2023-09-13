/*
  Warnings:

  - You are about to drop the `_User_checkListItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User_checkListItems" DROP CONSTRAINT "_User_checkListItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_checkListItems" DROP CONSTRAINT "_User_checkListItems_B_fkey";

-- AlterTable
ALTER TABLE "UserChecklistItem" ADD COLUMN     "user" UUID;

-- DropTable
DROP TABLE "_User_checkListItems";

-- CreateIndex
CREATE INDEX "UserChecklistItem_user_idx" ON "UserChecklistItem"("user");

-- AddForeignKey
ALTER TABLE "UserChecklistItem" ADD CONSTRAINT "UserChecklistItem_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
