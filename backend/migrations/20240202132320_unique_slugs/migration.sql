/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_slug_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
