/*
  Warnings:

  - Added the required column `sizeID` to the `ProductBuy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductBuy" ADD COLUMN     "sizeID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
