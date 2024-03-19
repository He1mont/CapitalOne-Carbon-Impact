/*
  Warnings:

  - You are about to drop the `usergoals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usergoals` DROP FOREIGN KEY `userGoals_accountID_fkey`;

-- AlterTable
ALTER TABLE `account` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usergoals`;

-- CreateTable
CREATE TABLE `userGoals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountID` VARCHAR(191) NOT NULL,
    `goal` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `userGoals_accountID_key`(`accountID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `account_email_key` ON `account`(`email`);

-- AddForeignKey
ALTER TABLE `userGoals` ADD CONSTRAINT `userGoals_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;
