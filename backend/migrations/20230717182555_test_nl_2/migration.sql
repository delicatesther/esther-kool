-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "contentNL" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
ADD COLUMN     "summaryNL" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titleNL" TEXT NOT NULL DEFAULT '';
