import type { Tag } from "@/entities/tags";
import { structuredTagMapper } from "@/utils/structured-tag-mapper";
import TagLink from "./tag-link";
import TagLocationDate from "./tag-location-date";
import clsx from "clsx";

interface Props {
	activeTagId?: string;
	activeYear?: string;
	className?: string;
	date: string;
	tags?: Tag[];
}

export default function TagBox({
	activeTagId,
	activeYear,
	className,
	date,
	tags = [],
}: Readonly<Props>) {
	const structuredTags = structuredTagMapper(tags);

	return (
		<ul className={clsx("text-muted flex items-center flex-wrap gap-x-1 text-sm", className)}>
			<TagLocationDate
				activeTagId={activeTagId}
				activeYear={activeYear}
				date={date}
				structuredTags={structuredTags}
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
