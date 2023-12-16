/*
  Warnings:

  - A unique constraint covering the columns `[file_id]` on the table `user_avatars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_id` to the `user_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user_avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_url` to the `user_avatars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_avatars` ADD COLUMN `file_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnail_url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_avatars_file_id_key` ON `user_avatars`(`file_id`);
