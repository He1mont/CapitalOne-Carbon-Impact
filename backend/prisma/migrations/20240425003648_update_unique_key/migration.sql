/*
  Warnings:

  - You are about to alter the column `goal` on the `userGoals` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[accountID,year,month]` on the table `userGoals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `userGoals_year_month_key` ON `userGoals`;

-- AlterTable
ALTER TABLE `userGoals` MODIFY `goal` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `userGoals_accountID_year_month_key` ON `userGoals`(`accountID`, `year`, `month`);
