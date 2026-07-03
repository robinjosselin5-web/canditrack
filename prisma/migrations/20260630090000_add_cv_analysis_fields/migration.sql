-- Add analysis support for candidate CVs.
CREATE TYPE "candidate_cv_analysis_status" AS ENUM ('not_analyzed', 'processing', 'completed', 'failed');

ALTER TABLE "candidate_cvs"
ADD COLUMN "analysis_status" "candidate_cv_analysis_status" NOT NULL DEFAULT 'not_analyzed',
ADD COLUMN "extracted_text" TEXT,
ADD COLUMN "last_analyzed_at" TIMESTAMP(6);
