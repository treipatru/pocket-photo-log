/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1qj4hvpy828p9ku",
    "created": "2024-07-25 14:59:30.699Z",
    "updated": "2024-07-25 14:59:30.699Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h4drvrjk",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 100,
          "pattern": "^[a-zA-Z0-9\\- ]+$"
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_v51sbfh` ON `tags` (`name`)"
    ],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1qj4hvpy828p9ku");

  return dao.deleteCollection(collection);
})
