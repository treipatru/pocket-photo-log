import clsx from "clsx";
import PostPagination from "@/components/posts/post/post-pagination";

type SidebarTagNavProps = {
	page?: number;
	totalItems: number;
	tagId?: string;
	totalPages?: number;
}

export default function SidebarTagNav({
	page,
	tagId,
	totalItems,
	totalPages,
}: Readonly<SidebarTagNavProps>) {
	if (!tagId) {
		return null
	}

	const navigationItems = Array.from({ length: totalItems });

	return (
		<div className="flex flex-col gap-2">
			{page && totalPages && (
				<PostPagination
					page={page}
					tagId={tagId}
					totalPages={totalPages}
				/>
			)}

			<div className="flex gap-1 flex-wrap">
				{
					navigationItems.map((_, i) => {
						return (
							<a
								key={`${tagId}-${i}`}
								href={`/tags/${tagId}/${i + 1}`}
								className={clsx("bg-muted-background size-2", {
									"bg-primary": page === i + 1
								})}
							>
								<span className="sr-only">Page {i + 1}</span>
							</a>
						);
					})
				}
			</div>
		</div>
	)
}
