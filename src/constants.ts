/**
 * Database file path and name.
 */
export const DATABASE_FILE = "db/db.sqlite";

/**
 * Directory where backups will be stored.
 */
export const BACKUP_DIR = "/app/backups";

/**
 * Directory where uploads will be saved.
 */
export const UPLOAD_DIR = "/app/storage";

/**
 * Maximum file size for accepted uploads.
 */
export const MAX_FILE_SIZE = 1024 * 1024 * 20; // 20MB

/**
 * Uploads will be saved in this format.
 */
export const IMAGE_FORMAT = ".jpg";

/**
 * Sizes of the images to save.
 */
export const IMAGE_SIZES = {
	SM: {
		maxSideLength: 150,
		quality: 85,
		size: "SM",
	},
	MD: {
		maxSideLength: 800,
		quality: 85,
		size: "MD",
	},
	LG: {
		maxSideLength: 1200,
		quality: 85,
		size: "LG",
	},
} as const;
