-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_accountID_fkey` FOREIGN KEY (`accountID`) REFERENCES `account`(`accountID`) ON DELETE RESTRICT ON UPDATE CASCADE;
