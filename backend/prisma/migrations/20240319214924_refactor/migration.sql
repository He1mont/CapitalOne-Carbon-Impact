-- DropIndex
DROP INDEX `transaction_accountID_key` ON `transaction`;

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `Transaction_transactionUUID_key` TO `transaction_transactionUUID_key`;
