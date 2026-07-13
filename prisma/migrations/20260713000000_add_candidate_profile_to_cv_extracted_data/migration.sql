-- Attach extracted CV data to the candidate profile while preserving CV provenance.
ALTER TABLE "cv_experiences"
ADD COLUMN "candidate_profile_id" UUID;

ALTER TABLE "cv_skills"
ADD COLUMN "candidate_profile_id" UUID;

ALTER TABLE "cv_trainings"
ADD COLUMN "candidate_profile_id" UUID;

UPDATE "cv_experiences" AS extracted
SET "candidate_profile_id" = cv."candidate_profile_id"
FROM "candidate_cvs" AS cv
WHERE extracted."candidate_cv_id" = cv."id";

UPDATE "cv_skills" AS extracted
SET "candidate_profile_id" = cv."candidate_profile_id"
FROM "candidate_cvs" AS cv
WHERE extracted."candidate_cv_id" = cv."id";

UPDATE "cv_trainings" AS extracted
SET "candidate_profile_id" = cv."candidate_profile_id"
FROM "candidate_cvs" AS cv
WHERE extracted."candidate_cv_id" = cv."id";

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "cv_experiences" WHERE "candidate_profile_id" IS NULL) THEN
    RAISE EXCEPTION 'Backfill failed: cv_experiences contains rows without candidate_profile_id';
  END IF;

  IF EXISTS (SELECT 1 FROM "cv_skills" WHERE "candidate_profile_id" IS NULL) THEN
    RAISE EXCEPTION 'Backfill failed: cv_skills contains rows without candidate_profile_id';
  END IF;

  IF EXISTS (SELECT 1 FROM "cv_trainings" WHERE "candidate_profile_id" IS NULL) THEN
    RAISE EXCEPTION 'Backfill failed: cv_trainings contains rows without candidate_profile_id';
  END IF;
END
$$;

ALTER TABLE "cv_experiences"
ALTER COLUMN "candidate_profile_id" SET NOT NULL;

ALTER TABLE "cv_skills"
ALTER COLUMN "candidate_profile_id" SET NOT NULL;

ALTER TABLE "cv_trainings"
ALTER COLUMN "candidate_profile_id" SET NOT NULL;

ALTER TABLE "cv_experiences"
ADD CONSTRAINT "cv_experiences_candidate_profile_id_fkey"
FOREIGN KEY ("candidate_profile_id") REFERENCES "candidate_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_skills"
ADD CONSTRAINT "cv_skills_candidate_profile_id_fkey"
FOREIGN KEY ("candidate_profile_id") REFERENCES "candidate_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_trainings"
ADD CONSTRAINT "cv_trainings_candidate_profile_id_fkey"
FOREIGN KEY ("candidate_profile_id") REFERENCES "candidate_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_experiences"
DROP CONSTRAINT "cv_experiences_candidate_cv_id_fkey";

ALTER TABLE "cv_skills"
DROP CONSTRAINT "cv_skills_candidate_cv_id_fkey";

ALTER TABLE "cv_trainings"
DROP CONSTRAINT "cv_trainings_candidate_cv_id_fkey";

ALTER TABLE "cv_experiences"
ALTER COLUMN "candidate_cv_id" DROP NOT NULL;

ALTER TABLE "cv_skills"
ALTER COLUMN "candidate_cv_id" DROP NOT NULL;

ALTER TABLE "cv_trainings"
ALTER COLUMN "candidate_cv_id" DROP NOT NULL;

ALTER TABLE "cv_experiences"
ADD CONSTRAINT "cv_experiences_candidate_cv_id_fkey"
FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "cv_skills"
ADD CONSTRAINT "cv_skills_candidate_cv_id_fkey"
FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "cv_trainings"
ADD CONSTRAINT "cv_trainings_candidate_cv_id_fkey"
FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "cv_experiences_candidate_profile_id_idx"
ON "cv_experiences"("candidate_profile_id");

CREATE INDEX "cv_skills_candidate_profile_id_idx"
ON "cv_skills"("candidate_profile_id");

CREATE INDEX "cv_trainings_candidate_profile_id_idx"
ON "cv_trainings"("candidate_profile_id");
