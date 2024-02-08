/*
  Warnings:

  - Added the required column `sizeID` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "sizeID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
