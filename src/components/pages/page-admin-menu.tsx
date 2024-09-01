import { type Page } from "@/entities/pages";
import { type ReactNode } from "react";
import clsx from "clsx";

type PageAdminMenuProps = {
	className?: string;
	page: Page;
}

function MenuLink({
	href,
	children
}: Readonly<{ href: string; children: ReactNode }>) {
	return (
		<a
			className="btn btn-sm btn-outline"
			data-astro-prefetch="false"
			href={href}
		>
			{children}
		</a>
	)
}

export default function PageAdminMenu({
	className,
	page
}: Readonly<PageAdminMenuProps>) {
	return (
		<div className={clsx("flex gap-4 mb-4 items-center justify-center", className)}>
			<MenuLink href={`/cms/pages/${page.slug}/update`}>
				Update
			</MenuLink>

			<MenuLink href={`/cms/pages/${page.slug}/delete`}>
				Delete
			</MenuLink>
		</div>
	)
}
