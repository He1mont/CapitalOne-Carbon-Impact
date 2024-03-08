/*
  Warnings:

  - You are about to drop the column `totalCarbonScore` on the `friends` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `usergoals` table. All the data in the column will be lost.
  - You are about to drop the column `totalCarbonScore` on the `usergoals` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `usergoals` table. All the data in the column will be lost.
  - Added the required column `accountID` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friends` DROP FOREIGN KEY `Friends_totalCarbonScore_fkey`;

-- DropForeignKey
ALTER TABLE `friends` DROP FOREIGN KEY `Friends_username_fkey`;

-- DropIndex
DROP INDEX `UserGoals_totalCarbonScore_key` ON `usergoals`;

-- DropIndex
DROP INDEX `UserGoals_username_key` ON `usergoals`;

-- AlterTable
ALTER TABLE `friends` DROP COLUMN `totalCarbonScore`,
    ADD COLUMN `accountID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usergoals` DROP COLUMN `name`,
    DROP COLUMN `totalCarbonScore`,
    DROP COLUMN `username`;
