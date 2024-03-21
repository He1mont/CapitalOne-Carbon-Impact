-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `accountID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `account_username_key`(`username`),
    UNIQUE INDEX `account_accountID_key`(`accountID`),
    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionUUID` VARCHAR(191) NOT NULL,
    `accountID` VARCHAR(191) NOT NULL,
    `merchantName` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `carbonScore` DOUBLE NOT NULL,

    UNIQUE INDEX `transaction_transactionUUID_key`(`transactionUUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `following` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountID` VARCHAR(191) NOT NULL,
    `followingID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `following_accountID_followingID_key`(`accountID`, `followingID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userGoals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountID` VARCHAR(191) NOT NULL,
    `goal` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `userGoals_accountID_month_key`(`accountID`, `month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_followingID_fkey` FOREIGN KEY (`followingID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userGoals` ADD CONSTRAINT `userGoals_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;
