-- Add provenance without losing existing extracted or manually created skills.
ALTER TABLE "cv_skills" ADD COLUMN "data_source" "CandidateDataSource";

UPDATE "cv_skills"
SET "data_source" = CASE
  WHEN "candidate_cv_id" IS NULL THEN 'MANUAL'::"CandidateDataSource"
  ELSE 'AI'::"CandidateDataSource"
END;

ALTER TABLE "cv_skills"
  ALTER COLUMN "data_source" SET DEFAULT 'AI',
  ALTER COLUMN "data_source" SET NOT NULL;
