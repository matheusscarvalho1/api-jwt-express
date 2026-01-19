/*
  Warnings:

  - Added the required column `createdBy` to the `ProtectedData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProtectedData" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ProtectedData_createdBy_idx" ON "ProtectedData"("createdBy");

-- AddForeignKey
ALTER TABLE "ProtectedData" ADD CONSTRAINT "ProtectedData_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
