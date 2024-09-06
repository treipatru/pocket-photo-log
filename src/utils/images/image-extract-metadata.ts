import { format } from "date-fns";
import loadImage from "blueimp-load-image";

type ExtractMetadataFromImgRes = {
	shotOn: string | null;
	tags: string[];
};

export default function imageExtractMetadata(
	file: File
): Promise<ExtractMetadataFromImgRes> {
	return new Promise((resolve, reject) => {
		const tags: ExtractMetadataFromImgRes["tags"] = [];
		let shotOn: ExtractMetadataFromImgRes["shotOn"] = null;

		loadImage.parseMetaData(file, (data) => {
			try {
				//@ts-ignore - the getAll method is not typed
				const exif = data.exif?.getAll();
				//@ts-ignore - the getAll method is not typed
				const iptc = data.iptc?.getAll();

				/**
				 * Tags are references as Keywords in IPTC metadata.
				 * They are comma-separated strings.
				 */
				if (iptc) {
					const iptcTags = iptc.Keywords ? iptc.Keywords.split(",") : [];
					tags.push(...iptcTags);

					/**
					 * It is preferable to use the DateCreated field in the IPTC data
					 * as the shotOn date.
					 */
					if (iptc.DateCreated) {
						shotOn = extractIptcDate(iptc.DateCreated);
					}
				}

				/**
				 * If no IPTC DateCreated is found, try to use any of the EXIF date
				 * fields as the shotOn date.
				 *
				 * The EXIF spec lists multiple date fields but none of them are guaranteed
				 * to exist in the metadata.
				 *
				 * The preferred order is:
				 * 1. DateTime
				 * 2. DateTimeOriginal
				 * 3. DateTimeDigitized
				 *
				 * These are the most commonly used, in this order.
				 */
				if (exif && !shotOn) {
					const date =
						exif.DateTime ?? exif.DateTimeOriginal ?? exif.DateTimeDigitized;
					shotOn = extractExifDate(date);
				}

				resolve({ shotOn, tags });
			} catch (error) {
				reject(new Error("Error parsing metadata"));
			}
		});
	});
}

function extractExifDate(str: string): string | null {
	// Check for the format `2024:08:16 10:24:47`
	const dateTimeRegex = /^\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}$/;

	if (dateTimeRegex.test(str)) {
		// Extract the YYYY, MM, and DD parts
		const datePartMatch = RegExp(/^(\d{4}):(\d{2}):(\d{2})/).exec(str);

		if (datePartMatch) {
			const year = datePartMatch[1];
			const month = datePartMatch[2];
			const day = datePartMatch[3];

			return `${year}-${month}-${day}`;
		}
	}

	return null;
}

function extractIptcDate(str: string): string | null {
	// Check for the format `20240131`
	const dateTimeRegex = /^\d{8}$/;

	if (dateTimeRegex.test(str)) {
		// Insert hyphens to match `YYYY-MM-DD`
		const standardizedDateString = str.replace(
			/(\d{4})(\d{2})(\d{2})/,
			"$1-$2-$3"
		);
		return format(new Date(standardizedDateString), "yyyy-MM-dd");
	}

	return null;
}
