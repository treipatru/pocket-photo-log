/*
  Warnings:

  - You are about to drop the column `created` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `shot_on` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Stat` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Stat` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_Page" ("content", "id", "name", "slug") SELECT "content", "id", "name", "slug" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
CREATE INDEX "Page_slug_idx" ON "Page"("slug");
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt" TEXT NOT NULL DEFAULT '',
    "caption" TEXT NOT NULL DEFAULT '',
    "image_url" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "shotOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Post" ("alt", "caption", "height", "id", "image_url", "published", "width") SELECT "alt", "caption", "height", "id", "image_url", "published", "width" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_shotOn_idx" ON "Post"("shotOn");
CREATE INDEX "Post_published_shotOn_idx" ON "Post"("published", "shotOn");
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Setting" ("id", "name", "value") SELECT "id", "name", "value" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "post_id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stat_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("id", "likes", "post_id", "views") SELECT "id", "likes", "post_id", "views" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_post_id_key" ON "Stat"("post_id");
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password_hash" TEXT NOT NULL,
    "username" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "password_hash", "username") SELECT "id", "password_hash", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
