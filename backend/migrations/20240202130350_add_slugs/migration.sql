-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");
