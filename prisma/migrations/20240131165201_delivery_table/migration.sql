-- AlterTable
ALTER TABLE "Buy" ADD COLUMN     "parcel" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Delivery" (
    "ID" SERIAL NOT NULL,
    "buyID" INTEGER NOT NULL,
    "received" BOOLEAN NOT NULL DEFAULT true,
    "onTheWay" BOOLEAN NOT NULL DEFAULT false,
    "delivered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_buyID_fkey" FOREIGN KEY ("buyID") REFERENCES "Buy"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
