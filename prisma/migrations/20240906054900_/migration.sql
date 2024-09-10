-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "post_id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stat_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("created", "id", "likes", "post_id", "updated", "views") SELECT "created", "id", "likes", "post_id", "updated", "views" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_post_id_key" ON "Stat"("post_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
