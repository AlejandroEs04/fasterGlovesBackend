-- CreateTable
CREATE TABLE "Buy" (
    "ID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Buy_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductBuy" (
    "ID" SERIAL NOT NULL,
    "buyID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "ProductBuy_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_buyID_fkey" FOREIGN KEY ("buyID") REFERENCES "Buy"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
