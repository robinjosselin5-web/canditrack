-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "avatar_mime_type" VARCHAR(100),
ADD COLUMN     "avatar_storage_key" VARCHAR(500),
ADD COLUMN     "github" VARCHAR(255),
ADD COLUMN     "linkedin" VARCHAR(255),
ADD COLUMN     "phone" VARCHAR(30);
