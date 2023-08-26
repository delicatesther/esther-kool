-- CreateTable
CREATE TABLE "CheckListItem" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "titleNL" TEXT NOT NULL DEFAULT '',
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER,
    "description" TEXT NOT NULL DEFAULT '',
    "descriptionNL" TEXT NOT NULL DEFAULT '',
    "publishDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CheckListItem_tags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CheckListItem_tags_AB_unique" ON "_CheckListItem_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_CheckListItem_tags_B_index" ON "_CheckListItem_tags"("B");

-- AddForeignKey
ALTER TABLE "_CheckListItem_tags" ADD CONSTRAINT "_CheckListItem_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "CheckListItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CheckListItem_tags" ADD CONSTRAINT "_CheckListItem_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
