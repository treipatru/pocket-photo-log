/*
  Warnings:

  - You are about to drop the column `isLocked` on the `Setting` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ReadOnlyFlag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

-- CreateIndex
CREATE UNIQUE INDEX "ReadOnlyFlag_id_key" ON "ReadOnlyFlag"("id");
