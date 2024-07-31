import { searchTags } from "@/services/client-api/search";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryWrapper from "@/components/query-wrapper";

interface ComponentProps {
	onCancel: () => void;
	onSelect: (tag: string) => void;
	value: string[];
}

function Component({
	onCancel,
	onSelect,
	value,
}: Readonly<ComponentProps>) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [queryValue] = useDebounce(searchTerm, 200);
	const queryClient = useQueryClient();

	const { data, isFetched } = useQuery({
		enabled: queryValue.length > 0,
		queryKey: ['tags'],
		queryFn: async () => {
			const results = await searchTags({ query: queryValue })

			/**
			 * Exclude tags which have already been selected.
			 */
			return results.items
				.map((tag) => tag.name)
				.filter((tag) => !value.includes(tag));
		},
	})

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ['tags'] })

		if (queryValue.length < 1) {
			queryClient.removeQueries({ queryKey: ['tags'] })
		}
	}, [queryValue]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCancel()
			return;
		}

		const selectKeys = ['Enter', ',']

		if (selectKeys.includes(e.key)) {
			e.preventDefault();

			/**
			 * Make sure the tag is valid.
			 * - Data should be fetched
			 * - A non-empty search term should be entered
			 * - The search term should not already be in the list
			 */
			if (!isFetched ||
				!data ||
				!searchTerm.length ||
				value.includes(searchTerm)
			) {
				return;
			}

			/**
			 * If the search did not yield results, submit the term as a new tag.
			 */
			if (!!data.length) {
				onSelect(searchTerm);
				return
			}

			/**
			 * If the term matches first option in the list, select it.
			 * Otherwise, create a new tag, even if there are options.
			 */
			if (searchTerm === data[0]) {
				onSelect(data[0]);
			} else {
				onSelect(searchTerm);
			}
		}
	};

	const isListVisible = searchTerm.length > 0 && isFetched && !!data?.length;

	return (
		<QueryWrapper>
			<details className="dropdown dropdown-top md:dropdown-bottom" open={isListVisible}>
				<summary
					autoFocus
					tabIndex={-1}
					className="inline-block"
				>
					<input
						autoFocus
						className="input input-bordered input-sm w-28 px-1"
						onInput={v => setSearchTerm(v.currentTarget.value)}
						onKeyDown={handleKeyDown}
						type="text"
						value={searchTerm}
					/>
				</summary>

				<ul className="menu max-h-40 flex-row dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow overflow-x-hidden overflow-y-auto">
					{isListVisible &&
						data.map(option => (
							<li
								key={option}
								className="w-full"
							>
								<button
									onClick={() => onSelect(option)}
									tabIndex={0}
								>
									{option}
								</button>
							</li>
						))}
				</ul>
			</details>
		</QueryWrapper>
	)
}

export default function TagDropdown(props: Readonly<ComponentProps>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
