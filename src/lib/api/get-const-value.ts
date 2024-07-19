import { type Settings, type SettingsKeys } from "@/entities/settings";

export const getConstValue = (key: SettingsKeys, collection: Settings[]) => {
	const record = collection.find((record) => record.name === key);

	if (!record) {
		throw new Error(`Const ${key} not found`);
	}

	return record.value;
};
