/*
  Warnings:

  - Made the column `api_key` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "api_key" SET NOT NULL;
