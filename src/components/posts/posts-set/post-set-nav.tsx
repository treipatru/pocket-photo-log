import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import clsx from "clsx";
import PostSetNavPagination from "@/components/posts/posts-set/post-set-nav-pagination";
import PostSetNavSwipe from "@/components/posts/posts-set/post-set-nav-swipe";
import type { ReactNode } from "react";

type PostSetNavProps = APIPagination & {
	tagId: string;
	children: ReactNode;
}

export default function PostSetNav({
	children,
	page,
	tagId,
	totalPages,
}: Readonly<PostSetNavProps>) {
	const prevUrl = page === 1 ? null : `/tags/${tagId}/${page - 1}`;
	const nextUrl = page === totalPages ? null : `/tags/${tagId}/${page + 1}`;

	return (
		<PostSetNavSwipe
			nextPageUrl={nextUrl}
			prevPageUrl={prevUrl}
		>
			<PostSetNavPagination
				page={page}
				tagId={tagId}
				totalPages={totalPages}
			/>

			<div className="flex">
				<PrevNextButton
					href={prevUrl}
					direction="prev"
					invisible={page === 1}
				/>

				{children}

				<PrevNextButton
					href={nextUrl ?? "/explore"}
					direction="next"
				/>
			</div>
		</PostSetNavSwipe>
	)
}

function PrevNextButton({
	href,
	invisible,
	direction,
}: Readonly<{
	href: string | null;
	invisible?: boolean;
	direction: "prev" | "next";
}>) {
	return (
		<a
			href={href ?? "#"}
			className={clsx("hidden md:flex flex-col justify-center grow p-4 text-muted hover:text-primary transition-all duration-75 ease-in", {
				"invisible": invisible,
				"items-end": direction === "prev",
			})}
		>
			{direction === "prev" && <ChevronLeftIcon size="28" />}

			{direction === "next" && (
				href === null
					? "More"
					: <ChevronRightIcon size="28" />
			)}
		</a>
	)
}
