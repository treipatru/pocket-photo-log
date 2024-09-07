/**
 * Database file path and name.
 */
export const DATABASE_FILE = "storage/db.sqlite";

/**
 * Directory where backups will be stored.
 */
export const BACKUP_DIR = "/app/backups";

/**
 * Directory where uploads will be saved.
 */
export const UPLOAD_DIR = "/app/storage/images";

/**
 * Maximum file size for accepted uploads.
 */
export const MAX_FILE_SIZE = 1024 * 1024 * 20; // 20MB

/**
 * Uploads will be saved in this format.
 */
export const IMAGE_FORMAT = ".jpg";

export const UPLOAD_DIR = "storage/images";

export const IMAGE_SIZES = {
	SM: {
		maxSideLength: 100,
		quality: 75,
		size: "SM",
	},
	MD: {
		maxSideLength: 500,
		quality: 85,
		size: "MD",
	},
	LG: {
		maxSideLength: 1000,
		quality: 90,
		size: "LG",
	},
} as const;
