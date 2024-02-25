-- CreateTable
CREATE TABLE `UserGoals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `accountID` INTEGER NOT NULL,
    `goal` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `totalCarbonScore` DOUBLE NOT NULL,

    UNIQUE INDEX `UserGoals_username_key`(`username`),
    UNIQUE INDEX `UserGoals_totalCarbonScore_key`(`totalCarbonScore`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionUUID` VARCHAR(191) NOT NULL,
    `accountID` INTEGER NOT NULL,
    `carbonScore` DOUBLE NOT NULL,

    UNIQUE INDEX `Transaction_transactionUUID_key`(`transactionUUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friends` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `totalCarbonScore` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_username_fkey` FOREIGN KEY (`username`) REFERENCES `UserGoals`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_totalCarbonScore_fkey` FOREIGN KEY (`totalCarbonScore`) REFERENCES `UserGoals`(`totalCarbonScore`) ON DELETE RESTRICT ON UPDATE CASCADE;
