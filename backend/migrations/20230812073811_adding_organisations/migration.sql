-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "organisation" UUID,
ALTER COLUMN "publishDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Organisation" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "nameNL" TEXT NOT NULL DEFAULT '',
    "logo" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experience_organisation_idx" ON "Experience"("organisation");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_organisation_fkey" FOREIGN KEY ("organisation") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
