-- AlterTable
ALTER TABLE "User" ADD COLUMN     "assignedMentorId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_assignedMentorId_fkey" FOREIGN KEY ("assignedMentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
