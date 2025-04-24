/*
  Warnings:

  - You are about to drop the column `paymentUrl` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `payment_url` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentUrl",
ADD COLUMN     "payment_url" TEXT NOT NULL;
