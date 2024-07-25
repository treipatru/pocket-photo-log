/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wa7rof64i8vnzeo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjoykhji",
    "name": "file",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif"
      ],
      "thumbs": [
        "650x650f",
        "900x900f"
      ],
      "maxSelect": 1,
      "maxSize": 10485760,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wa7rof64i8vnzeo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjoykhji",
    "name": "file",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
        "video/mp4"
      ],
      "thumbs": [
        "650x650f",
        "900x900f"
      ],
      "maxSelect": 1,
      "maxSize": 10485760,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
