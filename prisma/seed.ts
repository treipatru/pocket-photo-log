import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	try {
		// Check if the database has already been seeded
		const seedFlag = await prisma.seedFlag.findUnique({ where: { id: 1 } });
		if (seedFlag) {
			console.log("Database has already been seeded.");
			return;
		}

		// Seed with data
		await prisma.setting.create({
			data: {
				name: "TITLE",
				value: "pocket blog",
			},
		});

		await prisma.setting.create({
			data: {
				name: "DESCRIPTION",
				value: "A photo log",
			},
		});

		await prisma.setting.create({
			data: {
				name: "ALLOW_SIGNUP",
				value: "true",
			},
		});

		// Mark the database as seeded
		await prisma.seedFlag.create({ data: { id: 1 } });
		console.log("Database has been seeded.");
	} catch (error) {
		console.error("Error seeding database:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
