/*
  Warnings:

  - Made the column `year` on table `userGoals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `userGoals` MODIFY `year` VARCHAR(191) NOT NULL;
