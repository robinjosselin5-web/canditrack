ALTER TABLE "users"
ADD COLUMN "email_verified_at" TIMESTAMP(6),
ADD COLUMN "email_verification_code" VARCHAR(255),
ADD COLUMN "email_verification_expires_at" TIMESTAMP(6);

CREATE INDEX "users_email_verification_code_idx"
ON "users"("email_verification_code");
