-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "psp_response" DROP NOT NULL,
ALTER COLUMN "created_at" DROP DEFAULT;
