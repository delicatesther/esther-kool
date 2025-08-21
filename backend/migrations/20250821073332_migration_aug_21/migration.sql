-- AlterTable
ALTER TABLE "public"."_CheckListItem_tags" ADD CONSTRAINT "_CheckListItem_tags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_CheckListItem_tags_AB_unique";

-- AlterTable
ALTER TABLE "public"."_Experience_tags" ADD CONSTRAINT "_Experience_tags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_Experience_tags_AB_unique";

-- AlterTable
ALTER TABLE "public"."_Post_tags" ADD CONSTRAINT "_Post_tags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_Post_tags_AB_unique";

-- AlterTable
ALTER TABLE "public"."_User_height" ADD CONSTRAINT "_User_height_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_User_height_AB_unique";

-- AlterTable
ALTER TABLE "public"."_User_weight" ADD CONSTRAINT "_User_weight_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_User_weight_AB_unique";
