/*
  Warnings:

  - A unique constraint covering the columns `[year,month]` on the table `userGoals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `userGoals` ADD COLUMN `year` VARCHAR(191) NULL DEFAULT '2024';

-- CreateIndex
CREATE UNIQUE INDEX `userGoals_year_month_key` ON `userGoals`(`year`, `month`);
