import clsx from "clsx";
import { type StructuredTags } from "@/entities/tags"
import { format } from "date-fns";

interface Props {
	activeTagId?: string;
	date: string;
	structuredTags: StructuredTags;
}

function getClasses(id: string, activeTagId?: string) {
	const baseClasses = "px-2 link link-hover flex items-center rounded-sm"
	return id === activeTagId
		? `${baseClasses} text-accent bg-accent-background`
		: baseClasses
}

export default function TagLocationDate({
	activeTagId: selectedTagId,
	date,
	structuredTags,
}: Readonly<Props>) {
	const { pl, co } = structuredTags;

	return (
		<>
			{pl && (
				<li>
					<a
						href={`/tags/${pl.id}`}
						className={clsx(getClasses(pl.id, selectedTagId), 'capitalize')}
					>
						{pl.name}
					</a>
				</li>
			)}

			{co && (
				<li>
					<a
						href={`/tags/${co.id}`}
						className={clsx(getClasses(co.id, selectedTagId), 'uppercase')}
					>
						{co.name}
					</a>
				</li>
			)}

			<li>{format(date, 'yyyy')}</li>
		</>
	)
}
