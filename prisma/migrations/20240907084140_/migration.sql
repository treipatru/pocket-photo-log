/*
  Warnings:

  - You are about to drop the column `inProgress` on the `Backup` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Backup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileName" TEXT NOT NULL,
    "size" INTEGER NOT NULL
);
INSERT INTO "new_Backup" ("createdAt", "fileName", "id", "size") SELECT "createdAt", "fileName", "id", "size" FROM "Backup";
DROP TABLE "Backup";
ALTER TABLE "new_Backup" RENAME TO "Backup";
CREATE TABLE "new_Setting" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "isLocked" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Setting" ("name", "value") SELECT "name", "value" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
