-- Allow duplicate file hashes for now: US-011 records hashes but does not block duplicate CV imports.
DROP INDEX IF EXISTS "candidate_cvs_file_hash_key";

-- Keep the database constraint aligned with the front-end label validation.
ALTER TABLE "candidate_cvs"
ALTER COLUMN "label" TYPE VARCHAR(50);
