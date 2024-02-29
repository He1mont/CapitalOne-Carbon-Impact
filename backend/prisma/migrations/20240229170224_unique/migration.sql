/*
  Warnings:

  - A unique constraint covering the columns `[accountID]` on the table `friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountID]` on the table `usergoals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `friends_accountID_key` ON `friends`(`accountID`);

-- CreateIndex
CREATE UNIQUE INDEX `usergoals_accountID_key` ON `usergoals`(`accountID`);
