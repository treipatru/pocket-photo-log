import clsx from "clsx";
import { type StructuredTags } from "@/entities/tags"

interface Props {
	activeTagId?: string;
	structuredTags: StructuredTags;
}

function getClasses(id: string, activeTagId?: string) {
	const baseClasses = "px-1 link link-hover flex items-center gap-1 rounded-sm"
	return id === activeTagId
		? `${baseClasses} text-accent bg-accent-background`
		: baseClasses
}

export default function TagLocationDate({
	activeTagId: selectedTagId,
	structuredTags,
}: Readonly<Props>) {
	const { pl, co, yr } = structuredTags;

	return (
		<ul className="flex gap-x-2 items-center text-sm">
			{pl && (
				<li className="text-xs">
					<a
						href={`/tags/${pl.id}`}
						className={clsx(getClasses(pl.id, selectedTagId), 'capitalize')}
					>
						{pl.name}
					</a>
				</li>
			)}

			{co && (
				<>
					{pl && <span>-</span>}

					<li className="text-xs">
						<a
							href={`/tags/${co.id}`}
							className={clsx(getClasses(co.id, selectedTagId), 'uppercase')}
						>
							{co.name}
						</a>
					</li>

				</>
			)}

			{yr && (
				<>
					{co && <span>-</span>}

					<li className="text-xs">
						<a
							href={`/tags/${yr.id}`}
							className={clsx(getClasses(yr.id, selectedTagId), 'uppercase')}
						>
							{yr.name}
						</a>
					</li>
				</>
			)}
		</ul>
	)
}
