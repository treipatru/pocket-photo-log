import { dbClient } from "@/services/db/db";
import { type PageCreate, type PageUpdate } from "@/entities/pages";

export async function createPage(page: PageCreate) {
	return await dbClient.page.create({
		data: page,
	});
}

export async function deletePage(id: string) {
	return await dbClient.page.delete({
		where: {
			id,
		},
	});
}

export async function getPages() {
	return await dbClient.page.findMany();
}

export async function getPageBySlug(slug: string) {
	return await dbClient.page.findFirst({
		where: {
			slug,
		},
	});
}

export async function updatePage(page: PageUpdate) {
	return await dbClient.page.update({
		where: {
			id: page.id,
		},
		data: page,
	});
}
