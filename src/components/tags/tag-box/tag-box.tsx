import type { Tag } from "@/entities/tags";
import { structuredTagMapper } from "@/utils/structured-tag-mapper";
import TagLink from "./tag-link";
import TagLocationDate from "./tag-location-date";

interface Props {
	tags?: Tag[];
	activeTagId?: string;
}

export default function TagBox({ tags, activeTagId }: Props) {
	if (!tags) {
		return null;
	}

	const structuredTags = structuredTagMapper(tags);

	return (
		<div className="text-muted mt-2 px-2 pb-1">
			<TagLocationDate activeTagId={activeTagId} structuredTags={structuredTags} />

			<ul className="flex items-center gap-x-1 flex-wrap mt-1">
				<TagLink tag={structuredTags.camera} category="camera" activeTagId={activeTagId} />
				<TagLink tag={structuredTags.form} category="form" activeTagId={activeTagId} />
				<TagLink tag={structuredTags.format} category="format" activeTagId={activeTagId} />
				<TagLink tag={structuredTags.film} category="film" activeTagId={activeTagId} />

				{structuredTags.other.map((tag) => (
					<TagLink tag={tag} activeTagId={activeTagId} />
				))}
			</ul>
		</div>
	)
}
