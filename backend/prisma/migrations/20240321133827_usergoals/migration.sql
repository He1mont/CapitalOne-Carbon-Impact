/*
  Warnings:

  - A unique constraint covering the columns `[accountID,month]` on the table `userGoals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `userGoals_accountID_month_key` ON `userGoals`(`accountID`, `month`);
