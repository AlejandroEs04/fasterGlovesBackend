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
    "postalCode" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "ID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("ID")
);

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
