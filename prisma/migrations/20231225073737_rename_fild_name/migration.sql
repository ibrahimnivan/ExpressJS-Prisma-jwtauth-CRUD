/*
  Warnings:

  - You are about to drop the column `nama` on the `branch` table. All the data in the column will be lost.
  - Added the required column `name` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `branch` DROP COLUMN `nama`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
