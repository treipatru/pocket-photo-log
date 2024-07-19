import { type Const, type ConstKeys } from "@/lib/api/types";

export const getConstValue = (key: ConstKeys, collection: Const[]) => {
	const record = collection.find((record) => record.name === key);

	if (!record) {
		throw new Error(`Const ${key} not found`);
	}

	return record.value;
};
