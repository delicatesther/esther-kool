/*
  Warnings:

  - You are about to drop the `_CheckListItem_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CheckListItem_users" DROP CONSTRAINT "_CheckListItem_users_A_fkey";

-- DropForeignKey
ALTER TABLE "_CheckListItem_users" DROP CONSTRAINT "_CheckListItem_users_B_fkey";

-- DropTable
DROP TABLE "_CheckListItem_users";

-- CreateTable
CREATE TABLE "UserChecklistItem" (
    "id" UUID NOT NULL,
    "checkListItem" UUID,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "count" INTEGER,

    CONSTRAINT "UserChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_User_checkListItems" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "UserChecklistItem_checkListItem_idx" ON "UserChecklistItem"("checkListItem");

-- CreateIndex
CREATE UNIQUE INDEX "_User_checkListItems_AB_unique" ON "_User_checkListItems"("A", "B");

-- CreateIndex
CREATE INDEX "_User_checkListItems_B_index" ON "_User_checkListItems"("B");

-- AddForeignKey
ALTER TABLE "UserChecklistItem" ADD CONSTRAINT "UserChecklistItem_checkListItem_fkey" FOREIGN KEY ("checkListItem") REFERENCES "CheckListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_checkListItems" ADD CONSTRAINT "_User_checkListItems_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_checkListItems" ADD CONSTRAINT "_User_checkListItems_B_fkey" FOREIGN KEY ("B") REFERENCES "UserChecklistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
