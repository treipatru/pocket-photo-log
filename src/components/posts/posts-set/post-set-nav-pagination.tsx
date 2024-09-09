import clsx from "clsx";

type PostSetNavPaginationProps = Pick<APIPagination, 'page' | 'totalPages'> & {
	tagId: string;
};

export default function PostSetNavPagination({
	page,
	tagId,
	totalPages,
}: Readonly<PostSetNavPaginationProps>) {
	/**
	 * Create an array of indices starting from page - 2 to page + 2.
	 * This is to show a maximum of 5 navigation items at a time where the
	 * current page is in the middle.
	 *
	 * */
	const navBase = Array.from({ length: 5 }, (_, i) => page - 2 + i);

	const navLinks = navBase.map((navPage) => {
		if (navPage < 1 || navPage > totalPages) {
			return null;
		}

		return navPage;
	});

	return (
		<div className="flex w-full items-center justify-center mb-4 max-w-4xl m-auto gap-x-1 font-normal">
			<div className="join">
				{
					navLinks.map((navPage, i) => {
						const key = `${tagId}-${i}`;

						/**
						 * If the navPage is null, then we render an invisible button.
						 * This avoids the nav items from shifting
						 * */
						if (navPage === null) {
							return <div key={key} className="join-item btn btn-xs invisible"></div>
						}

						const isCurrentPage = navPage === page;
						return (
							<a
								className={clsx("join-item btn btn-xs", { "btn-active": isCurrentPage })}
								href={`/tags/${tagId}/${navPage}`}
								key={key}
							>
								<span className={clsx("text-xs", { "opacity-50": isCurrentPage })}>
									{navPage}
								</span>
							</a>
						);
					})
				}
			</div>
		</div>
	)
}
