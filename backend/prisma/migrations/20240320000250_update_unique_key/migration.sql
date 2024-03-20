/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `following` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountID` VARCHAR(191) NOT NULL,
    `followingID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `following_accountID_followingID_key`(`accountID`, `followingID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `account_username_key` ON `account`(`username`);

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;
