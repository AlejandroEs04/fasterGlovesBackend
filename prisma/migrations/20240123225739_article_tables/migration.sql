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
ALTER TABLE "Article" ADD CONSTRAINT "Article_ArticleTypeID_fkey" FOREIGN KEY ("ArticleTypeID") REFERENCES "ArticleType"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleChild" ADD CONSTRAINT "ArticleChild_ArticleID_fkey" FOREIGN KEY ("ArticleID") REFERENCES "Article"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
