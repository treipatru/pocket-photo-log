import type { Tag } from "@/entities/tags";
import { structuredTagMapper } from "@/utils/structured-tag-mapper";
import TagLink from "./tag-link";
import TagLocationDate from "./tag-location-date";

interface Props {
	activeTagId?: string;
	date: string;
	tags?: Tag[];
}

export default function TagBox({
	activeTagId,
	date,
	tags = [],
}: Readonly<Props>) {
	const structuredTags = structuredTagMapper(tags);

	return (
		<ul className="text-muted mt-2 flex items-center flex-wrap gap-x-1 p-2 text-sm">
			<TagLocationDate
				activeTagId={activeTagId}
				structuredTags={structuredTags}
				date={date}
			/>

			<TagLink
				tag={structuredTags.camera}
				category="camera"
				activeTagId={activeTagId}
			/>

			<TagLink
				tag={structuredTags.form}
				category="form"
				activeTagId={activeTagId}
			/>

			<TagLink
				tag={structuredTags.format}
				category="format"
				activeTagId={activeTagId}
			/>

			<TagLink
				tag={structuredTags.film}
				category="film"
				activeTagId={activeTagId}
			/>

			{structuredTags.other.map((tag) => (
				<TagLink
					key={tag.id}
					tag={tag}
					activeTagId={activeTagId}
				/>
			))}
		</ul>
	)
}
