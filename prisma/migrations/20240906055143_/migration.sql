/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `Post` table without a default value. This is not possible if the table is not empty.

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
    "image_url" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "shot_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Post" ("alt", "caption", "created", "height", "id", "published", "shot_on", "updated", "width") SELECT "alt", "caption", "created", "height", "id", "published", "shot_on", "updated", "width" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_shot_on_idx" ON "Post"("shot_on");
CREATE INDEX "Post_published_shot_on_idx" ON "Post"("published", "shot_on");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
