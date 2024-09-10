/*
  Warnings:

  - You are about to drop the `ReadOnlyFlag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ReadOnlyFlag_id_key";

-- DropIndex
DROP INDEX "Stat_postId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReadOnlyFlag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Stat";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt" TEXT NOT NULL DEFAULT '',
    "caption" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "shotOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Post" ("alt", "caption", "createdAt", "height", "id", "imageUrl", "published", "shotOn", "width") SELECT "alt", "caption", "createdAt", "height", "id", "imageUrl", "published", "shotOn", "width" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_shotOn_idx" ON "Post"("shotOn");
CREATE INDEX "Post_published_shotOn_idx" ON "Post"("published", "shotOn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
