-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Height" (
    "id" UUID NOT NULL,
    "cm" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Height_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weight" (
    "id" UUID NOT NULL,
    "g" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_User_height" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_User_weight" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_height_AB_unique" ON "_User_height"("A", "B");

-- CreateIndex
CREATE INDEX "_User_height_B_index" ON "_User_height"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_User_weight_AB_unique" ON "_User_weight"("A", "B");

-- CreateIndex
CREATE INDEX "_User_weight_B_index" ON "_User_weight"("B");

-- AddForeignKey
ALTER TABLE "_User_height" ADD CONSTRAINT "_User_height_A_fkey" FOREIGN KEY ("A") REFERENCES "Height"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_height" ADD CONSTRAINT "_User_height_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_weight" ADD CONSTRAINT "_User_weight_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_weight" ADD CONSTRAINT "_User_weight_B_fkey" FOREIGN KEY ("B") REFERENCES "Weight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
