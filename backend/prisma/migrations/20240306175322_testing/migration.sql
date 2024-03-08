/*
  Warnings:

  - You are about to drop the `friends` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountID]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactiontime` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `userGoals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `transactiontime` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usergoals` ADD COLUMN `month` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `friends`;

-- CreateTable
CREATE TABLE `friendship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(191) NOT NULL,
    `friendID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `friendship_userID_key`(`userID`),
    UNIQUE INDEX `friendship_friendID_key`(`friendID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `accountID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `account_accountID_key`(`accountID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `transaction_accountID_key` ON `transaction`(`accountID`);

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_friendID_fkey` FOREIGN KEY (`friendID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userGoals` ADD CONSTRAINT `userGoals_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `usergoals` RENAME INDEX `usergoals_accountID_key` TO `userGoals_accountID_key`;
