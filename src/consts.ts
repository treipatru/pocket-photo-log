import { type Settings, type SettingsKeys } from "@/entities/settings";
import { pocketClient } from "@/services/pocket/pocket-client";

const getConstValue = (key: SettingsKeys, collection: Settings[]) => {
	const record = collection.find((record) => record.name === key);

	if (!record) {
		throw new Error(`Const ${key} not found`);
	}

	return record.value;
};

const siteConsts = await pocketClient.collection("settings").getFullList();

export const SITE_TITLE = getConstValue("SITE_TITLE", siteConsts);
export const SITE_DESCRIPTION = getConstValue("SITE_DESCRIPTION", siteConsts);
