/*
  Warnings:

  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - Added the required column `titleId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "title",
ADD COLUMN     "titleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProductTitle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ProductTitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ProductTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
