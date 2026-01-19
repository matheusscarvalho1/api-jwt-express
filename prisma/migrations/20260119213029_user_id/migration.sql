/*
  Warnings:

  - You are about to drop the column `createdBy` on the `ProtectedData` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ProtectedData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProtectedData" DROP CONSTRAINT "ProtectedData_createdBy_fkey";

-- DropIndex
DROP INDEX "ProtectedData_createdBy_idx";

-- AlterTable
ALTER TABLE "ProtectedData" DROP COLUMN "createdBy",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ProtectedData_userId_idx" ON "ProtectedData"("userId");

-- AddForeignKey
ALTER TABLE "ProtectedData" ADD CONSTRAINT "ProtectedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
