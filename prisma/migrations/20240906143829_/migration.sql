/*
  Warnings:

  - The primary key for the `Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Setting` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Setting" ("name", "value") SELECT "name", "value" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
