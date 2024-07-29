/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rupsh5d8qe9dwd9",
    "created": "2024-07-25 14:59:30.699Z",
    "updated": "2024-07-25 14:59:30.699Z",
    "name": "pages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qiyfai0c",
        "name": "content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "2lcul9lt",
        "name": "slug",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
        }
      },
      {
        "system": false,
        "id": "q1hvurqx",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_JVNOpk6` ON `pages` (`slug`)"
    ],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rupsh5d8qe9dwd9");

  return dao.deleteCollection(collection);
})
