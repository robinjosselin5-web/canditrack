-- CreateEnum
CREATE TYPE "CandidateDataSource" AS ENUM ('AI', 'MANUAL');

-- AlterTable
ALTER TABLE "cv_experiences" ADD COLUMN     "source" "CandidateDataSource" NOT NULL DEFAULT 'AI';
