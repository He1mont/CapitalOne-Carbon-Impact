/*
  Warnings:

  - Added the required column `address` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorMode` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indicator` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `colorMode` INTEGER NOT NULL,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `indicator` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
