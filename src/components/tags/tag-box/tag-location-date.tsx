import clsx from "clsx";
import { type StructuredTags } from "@/entities/tags"
import { format } from "date-fns";

interface Props {
	activeYear?: string;
	activeTagId?: string;
	date: Date;
	structuredTags: StructuredTags;
}

function getClasses(id: string, activeTagId?: string | null) {
	const baseClasses = "px-1 link link-hover flex items-center rounded-sm"
	return id === activeTagId
		? `${baseClasses} text-accent bg-accent-background`
		: baseClasses
}

export default function TagLocationDate({
	activeTagId,
	activeYear,
	date,
	structuredTags,
}: Readonly<Props>) {
	const { pl, co } = structuredTags;
	const year = format(date, 'yyyy');

	return (
		<>
			{pl && (
				<li>
					<a
						href={`/tags/${pl.id}`}
						className={clsx(getClasses(pl.id, activeTagId), 'capitalize')}
					>
						{pl.name}
					</a>
				</li>
			)}

			{co && (
				<li>
					<a
						href={`/tags/${co.id}`}
						className={clsx(getClasses(co.id, activeTagId), 'uppercase')}
					>
						{co.name}
					</a>
				</li>
			)}

			<li>
				<a
					href={`/posts?year=${year}`}
					className={clsx(getClasses(year, activeYear), 'uppercase')}
				>
					{year}
				</a>
			</li>
		</>
	)
}
