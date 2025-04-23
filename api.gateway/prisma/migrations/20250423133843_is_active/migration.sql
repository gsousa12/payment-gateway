/*
  Warnings:

  - Added the required column `is_active` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ALTER COLUMN "api_key" DROP NOT NULL;
