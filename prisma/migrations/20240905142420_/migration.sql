/*
  Warnings:

  - You are about to alter the column `height` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `width` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `likes` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `views` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt" TEXT NOT NULL DEFAULT '',
    "caption" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "shot_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Post" ("alt", "caption", "created", "height", "id", "image", "published", "shot_on", "updated", "width") SELECT "alt", "caption", "created", "height", "id", "image", "published", "shot_on", "updated", "width" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_shot_on_idx" ON "Post"("shot_on");
CREATE INDEX "Post_published_shot_on_idx" ON "Post"("published", "shot_on");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "post_id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stat_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("created", "id", "likes", "post_id", "updated", "views") SELECT "created", "id", "likes", "post_id", "updated", "views" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_post_id_key" ON "Stat"("post_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
