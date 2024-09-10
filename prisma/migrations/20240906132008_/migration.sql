/*
  Warnings:

  - You are about to drop the column `image_url` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Stat` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
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
    "width" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Post" ("alt", "caption", "createdAt", "height", "id", "published", "shotOn", "width") SELECT "alt", "caption", "createdAt", "height", "id", "published", "shotOn", "width" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_shotOn_idx" ON "Post"("shotOn");
CREATE INDEX "Post_published_shotOn_idx" ON "Post"("published", "shotOn");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "postId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stat_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("createdAt", "id", "likes", "views") SELECT "createdAt", "id", "likes", "views" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_postId_key" ON "Stat"("postId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
