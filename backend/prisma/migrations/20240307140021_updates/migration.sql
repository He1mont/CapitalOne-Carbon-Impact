/*
  Warnings:

  - You are about to drop the column `transactionTime` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantName` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `transactionTime`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `merchantName` VARCHAR(191) NOT NULL;
