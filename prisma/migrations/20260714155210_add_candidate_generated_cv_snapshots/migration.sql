-- CreateEnum
CREATE TYPE "generated_cv_visibility" AS ENUM ('private', 'link_only');

-- CreateTable
CREATE TABLE "candidate_generated_cvs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "public_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_profile_id" UUID NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "visibility" "generated_cv_visibility" NOT NULL DEFAULT 'link_only',
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30),
    "address" VARCHAR(255),
    "age" INTEGER,
    "linkedin" VARCHAR(255),
    "github" VARCHAR(255),
    "avatar_storage_key" VARCHAR(500),
    "avatar_mime_type" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_generated_cvs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_generated_cv_experiences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_generated_cv_id" UUID NOT NULL,
    "source_experience_id" UUID,
    "job_title" TEXT NOT NULL,
    "company_name" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "description" TEXT,
    "position" INTEGER NOT NULL,

    CONSTRAINT "candidate_generated_cv_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_generated_cv_skills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_generated_cv_id" UUID NOT NULL,
    "source_skill_id" UUID,
    "name" TEXT NOT NULL,
    "category" "cv_skill_category" NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "candidate_generated_cv_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_generated_cv_languages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_generated_cv_id" UUID NOT NULL,
    "source_skill_id" UUID,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "candidate_generated_cv_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_generated_cv_trainings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "candidate_generated_cv_id" UUID NOT NULL,
    "source_training_id" UUID,
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
    "position" INTEGER NOT NULL,

    CONSTRAINT "candidate_generated_cv_trainings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidate_generated_cvs_public_id_key" ON "candidate_generated_cvs"("public_id");

-- CreateIndex
CREATE INDEX "candidate_generated_cvs_candidate_profile_id_idx" ON "candidate_generated_cvs"("candidate_profile_id");

-- CreateIndex
CREATE INDEX "candidate_generated_cv_experiences_cv_id_idx" ON "candidate_generated_cv_experiences"("candidate_generated_cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_generated_cv_experiences_cv_id_position_key" ON "candidate_generated_cv_experiences"("candidate_generated_cv_id", "position");

-- CreateIndex
CREATE INDEX "candidate_generated_cv_skills_cv_id_idx" ON "candidate_generated_cv_skills"("candidate_generated_cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_generated_cv_skills_cv_id_position_key" ON "candidate_generated_cv_skills"("candidate_generated_cv_id", "position");

-- CreateIndex
CREATE INDEX "candidate_generated_cv_languages_cv_id_idx" ON "candidate_generated_cv_languages"("candidate_generated_cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_generated_cv_languages_cv_id_position_key" ON "candidate_generated_cv_languages"("candidate_generated_cv_id", "position");

-- CreateIndex
CREATE INDEX "candidate_generated_cv_trainings_cv_id_idx" ON "candidate_generated_cv_trainings"("candidate_generated_cv_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_generated_cv_trainings_cv_id_position_key" ON "candidate_generated_cv_trainings"("candidate_generated_cv_id", "position");

-- AddForeignKey
ALTER TABLE "candidate_generated_cvs" ADD CONSTRAINT "candidate_generated_cvs_candidate_profile_id_fkey" FOREIGN KEY ("candidate_profile_id") REFERENCES "candidate_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_experiences" ADD CONSTRAINT "candidate_generated_cv_experiences_candidate_generated_cv__fkey" FOREIGN KEY ("candidate_generated_cv_id") REFERENCES "candidate_generated_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_experiences" ADD CONSTRAINT "candidate_generated_cv_experiences_source_experience_id_fkey" FOREIGN KEY ("source_experience_id") REFERENCES "cv_experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_skills" ADD CONSTRAINT "candidate_generated_cv_skills_candidate_generated_cv_id_fkey" FOREIGN KEY ("candidate_generated_cv_id") REFERENCES "candidate_generated_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_skills" ADD CONSTRAINT "candidate_generated_cv_skills_source_skill_id_fkey" FOREIGN KEY ("source_skill_id") REFERENCES "cv_skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_languages" ADD CONSTRAINT "candidate_generated_cv_languages_candidate_generated_cv_id_fkey" FOREIGN KEY ("candidate_generated_cv_id") REFERENCES "candidate_generated_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_languages" ADD CONSTRAINT "candidate_generated_cv_languages_source_skill_id_fkey" FOREIGN KEY ("source_skill_id") REFERENCES "cv_skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_trainings" ADD CONSTRAINT "candidate_generated_cv_trainings_candidate_generated_cv_id_fkey" FOREIGN KEY ("candidate_generated_cv_id") REFERENCES "candidate_generated_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_generated_cv_trainings" ADD CONSTRAINT "candidate_generated_cv_trainings_source_training_id_fkey" FOREIGN KEY ("source_training_id") REFERENCES "cv_trainings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
