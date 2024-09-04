import { type Pagination } from "@/entities/api-client";
import clsx from "clsx";

type PostPaginationProps = Pick<Pagination, "page" | "totalPages"> & {
	className?: string;
	tagId: string;
}

/**
 * Pagination component for navigating between posts of a given tag.
 */
export default function PostPagination({
	className,
	page,
	tagId,
	totalPages,
}: Readonly<PostPaginationProps>) {
	const prevPage = page - 1;
	const nextPage = page + 1;

	return (
		<div className={clsx("flex justify-between gap-4 mt-4", className)}>
			<div className="w-1/2 text-center">
				{prevPage > 0 && (
					<a
						className="link link-hover"
						href={`/tags/${tagId}/${prevPage}`}
					>
						Previous
					</a>
				)}
			</div>

			<div className="w-1/2 text-center">
				{nextPage <= totalPages
					? (
						<a
							className="link link-hover w-1/2"
							href={`/tags/${tagId}/${nextPage}`}
						>
							Next
						</a>
					) :
					<a
						className="link link-hover"
						href={'/explore'}
					>
						Explore
					</a>
				}
			</div>
		</div>
	);
}
