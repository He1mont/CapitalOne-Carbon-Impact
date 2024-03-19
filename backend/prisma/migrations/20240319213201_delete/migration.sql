/*
  Warnings:

  - You are about to drop the `friendship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `friendship` DROP FOREIGN KEY `friendship_friendID_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_accountID_fkey`;

-- DropTable
DROP TABLE `friendship`;
