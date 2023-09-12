/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `CheckListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CheckListItem" ADD COLUMN     "image" UUID;

-- CreateTable
CREATE TABLE "CheckListItemImage" (
    "id" UUID NOT NULL,
    "image" JSONB,
    "altText" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CheckListItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CheckListItem_users" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CheckListItem_users_AB_unique" ON "_CheckListItem_users"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckListItem_users_B_index" ON "_CheckListItem_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CheckListItem_image_key" ON "CheckListItem"("image");

-- AddForeignKey
ALTER TABLE "CheckListItem" ADD CONSTRAINT "CheckListItem_image_fkey" FOREIGN KEY ("image") REFERENCES "CheckListItemImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckListItem_users" ADD CONSTRAINT "_CheckListItem_users_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckListItem_users" ADD CONSTRAINT "_CheckListItem_users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
