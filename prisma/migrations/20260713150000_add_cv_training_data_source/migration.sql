-- Add provenance without losing existing extracted or manually created trainings.
ALTER TABLE "cv_trainings" ADD COLUMN "source" "CandidateDataSource";

UPDATE "cv_trainings"
SET "source" = CASE
  WHEN "candidate_cv_id" IS NULL THEN 'MANUAL'::"CandidateDataSource"
  ELSE 'AI'::"CandidateDataSource"
END;

ALTER TABLE "cv_trainings"
  ALTER COLUMN "source" SET DEFAULT 'AI',
  ALTER COLUMN "source" SET NOT NULL;
