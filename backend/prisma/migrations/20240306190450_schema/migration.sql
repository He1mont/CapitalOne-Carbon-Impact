/*
  Warnings:

  - You are about to drop the column `transactiontime` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `transactionTime` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `friendship` DROP FOREIGN KEY `friendship_userID_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `transactiontime`,
    ADD COLUMN `transactionTime` VARCHAR(191) NOT NULL;
