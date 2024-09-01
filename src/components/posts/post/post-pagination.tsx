import { type Pagination } from "@/entities/api-client";

type PostPaginationProps = Pick<Pagination, "page" | "totalPages"> & {
	tagId: string;
}

/**
 * Pagination component for navigating between posts of a given tag.
 */
export default function PostPagination({
	page,
	tagId,
	totalPages,
}: Readonly<PostPaginationProps>) {
	const prevPage = page - 1;
	const nextPage = page + 1;

	return (
		<div className="flex justify-center gap-4 mt-4">
			{prevPage > 0 && (
				<a
					className="link link-hover"
					href={`/tags/${tagId}/${prevPage}`}
				>
					Previous
				</a>
			)}

			{nextPage <= totalPages
				? (
					<a
						className="link link-hover"
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
	);
}
