import { useState } from "react";

type TagCmsSearchProps = {
	initialQuery: string;
};

export default function TagCmsSearch({
	initialQuery,
}: Readonly<TagCmsSearchProps>) {
	const [query, setQuery] = useState(initialQuery);

	return (
		<form
			action="/cms/tags"
			method="GET"
			className="max-w-sm m-auto my-5 flex items-center justify-center gap-x-4"
		>
			<input
				className="input input-bordered"
				name="query"
				onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
				placeholder="Search tags"
				type="search"
				value={query}
			/>

			<button type="submit" className="btn">Search</button>
		</form>
	)
}
