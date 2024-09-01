import { type Post } from "@/entities/posts"
import { type ReactNode } from "react";
import clsx from "clsx";

type PostAdminMenuProps = {
	className?: string;
	post: Post;
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

export default function PostAdminMenu({
	className,
	post
}: Readonly<PostAdminMenuProps>) {
	return (
		<div className={clsx("flex gap-4 mr-2 mt-2 items-center justify-end", className)}>
			<MenuLink href={`/cms/posts/${post.id}/update`}>
				Update
			</MenuLink>

			<MenuLink href={`/cms/posts/${post.id}/delete`}>
				Delete
			</MenuLink>
		</div>
	)
}
