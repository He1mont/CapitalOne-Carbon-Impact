-- DropForeignKey
ALTER TABLE `following` DROP FOREIGN KEY `following_accountID_fkey`;

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_followingID_fkey` FOREIGN KEY (`followingID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;
