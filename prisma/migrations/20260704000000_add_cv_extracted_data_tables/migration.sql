-- Add structured CV extraction tables.
CREATE TYPE "cv_skill_category" AS ENUM ('LANGUAGES', 'FRAMEWORKS_LIBRARIES', 'TOOLS_TECHNOLOGIES', 'METHODOLOGIES', 'SOFT_SKILLS', 'OTHER');

CREATE TABLE "cv_experiences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_cv_id" UUID NOT NULL,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_experiences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cv_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_cv_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" "cv_skill_category" NOT NULL,
    "confidence" DOUBLE PRECISION,
    "source" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_skills_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cv_trainings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_cv_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "organization_name" TEXT,
    "degree" TEXT,
    "field_of_study" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "description" TEXT,
    "location" TEXT,
    "is_certification" BOOLEAN NOT NULL DEFAULT false,
    "certification_type" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_trainings_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "cv_experiences_candidate_cv_id_idx" ON "cv_experiences"("candidate_cv_id");
CREATE INDEX "cv_skills_candidate_cv_id_idx" ON "cv_skills"("candidate_cv_id");
CREATE INDEX "cv_skills_candidate_cv_id_category_idx" ON "cv_skills"("candidate_cv_id", "category");
CREATE INDEX "cv_trainings_candidate_cv_id_idx" ON "cv_trainings"("candidate_cv_id");

ALTER TABLE "cv_experiences" ADD CONSTRAINT "cv_experiences_candidate_cv_id_fkey" FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cv_skills" ADD CONSTRAINT "cv_skills_candidate_cv_id_fkey" FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cv_trainings" ADD CONSTRAINT "cv_trainings_candidate_cv_id_fkey" FOREIGN KEY ("candidate_cv_id") REFERENCES "candidate_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
