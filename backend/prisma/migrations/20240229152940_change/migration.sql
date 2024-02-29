-- DropIndex
DROP INDEX `Friends_username_fkey` ON `friends`;

-- AlterTable
ALTER TABLE `friends` MODIFY `accountID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `accountID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usergoals` MODIFY `accountID` VARCHAR(191) NOT NULL;
