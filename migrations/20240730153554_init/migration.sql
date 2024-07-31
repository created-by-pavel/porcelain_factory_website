/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "totalCost" SET DEFAULT 0,
ALTER COLUMN "totalCost" SET DATA TYPE DOUBLE PRECISION;
