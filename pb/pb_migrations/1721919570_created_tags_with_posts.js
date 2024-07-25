/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mqvf2p64xyypc2d",
    "created": "2024-07-25 14:59:30.699Z",
    "updated": "2024-07-25 14:59:30.702Z",
    "name": "tags_with_posts",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rahh2uyf",
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
      },
      {
        "system": false,
        "id": "r1a4u9je",
        "name": "post_count",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "WITH extracted_tags AS (\n    SELECT value AS id\n    FROM posts, json_each(posts.tags)\n)\nSELECT t.id AS id, t.name AS name, COUNT(e.id) AS post_count\nFROM extracted_tags e\nJOIN tags t ON e.id = t.id\nGROUP BY t.id, t.name;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mqvf2p64xyypc2d");

  return dao.deleteCollection(collection);
})
