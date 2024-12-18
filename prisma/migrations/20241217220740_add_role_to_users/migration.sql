-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'MEMBER';
