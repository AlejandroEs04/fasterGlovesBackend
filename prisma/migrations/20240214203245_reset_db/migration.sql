-- CreateTable
CREATE TABLE "Product" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeID" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Size" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "letter" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Color" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "DetProductSize" (
    "ID" SERIAL NOT NULL,
    "productID" INTEGER NOT NULL,
    "sizeID" INTEGER NOT NULL,

    CONSTRAINT "DetProductSize_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "DetProductColor" (
    "ID" SERIAL NOT NULL,
    "productID" INTEGER NOT NULL,
    "colorID" INTEGER NOT NULL,

    CONSTRAINT "DetProductColor_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Type" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "externNumber" INTEGER NOT NULL,
    "internNumber" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "ID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "sizeID" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Buy" (
    "ID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "parcel" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Buy_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "ID" SERIAL NOT NULL,
    "buyID" INTEGER NOT NULL,
    "received" BOOLEAN NOT NULL DEFAULT true,
    "onTheWay" BOOLEAN NOT NULL DEFAULT false,
    "delivered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductBuy" (
    "ID" SERIAL NOT NULL,
    "buyID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "sizeID" INTEGER NOT NULL,

    CONSTRAINT "ProductBuy_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Article" (
    "ID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ArticleTypeID" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ArticleChild" (
    "ID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "ArticleID" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "url" TEXT,

    CONSTRAINT "ArticleChild_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ArticleType" (
    "ID" SERIAL NOT NULL,
    "seccion" TEXT NOT NULL,

    CONSTRAINT "ArticleType_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_ArticleTypeID_key" ON "Article"("ArticleTypeID");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "Type"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetProductSize" ADD CONSTRAINT "DetProductSize_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetProductSize" ADD CONSTRAINT "DetProductSize_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetProductColor" ADD CONSTRAINT "DetProductColor_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetProductColor" ADD CONSTRAINT "DetProductColor_colorID_fkey" FOREIGN KEY ("colorID") REFERENCES "Color"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_buyID_fkey" FOREIGN KEY ("buyID") REFERENCES "Buy"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_buyID_fkey" FOREIGN KEY ("buyID") REFERENCES "Buy"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBuy" ADD CONSTRAINT "ProductBuy_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_ArticleTypeID_fkey" FOREIGN KEY ("ArticleTypeID") REFERENCES "ArticleType"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleChild" ADD CONSTRAINT "ArticleChild_ArticleID_fkey" FOREIGN KEY ("ArticleID") REFERENCES "Article"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
