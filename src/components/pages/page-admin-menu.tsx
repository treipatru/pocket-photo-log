import type { Page } from "@prisma/client";
import PageDeleteForm from "./forms/page-delete-form";

type PageAdminMenuProps = {
	page: Page
}

export default function PageAdminMenu({
	page
}: Readonly<PageAdminMenuProps>) {
	return (
		<div className="flex gap-4 mb-4 items-center justify-center">
			<a
				className="btn btn-sm btn-outline"
				href={`/cms/pages/${page.slug}/update`}
			>
				Update
			</a>

			<PageDeleteForm page={page} />
		</div>
	)
}
