DROP INDEX IF EXISTS "candidate_cvs_file_hash_key";

ALTER TABLE "candidate_cvs"
DROP COLUMN IF EXISTS "file_hash";
