import { dbClient } from "@/services/db/db";

export async function createUser(data: {
	id: string;
	password_hash: string;
	username: string;
}) {
	const user = await dbClient.user.create({
		data,
	});

	return user;
}

export async function getUserByUsername(username: string) {
	const user = await dbClient.user.findUnique({
		where: {
			username,
		},
	});

	return user;
}

export async function getUserCount() {
	const count = await dbClient.user.count();

	return count;
}
