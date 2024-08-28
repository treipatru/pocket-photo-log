import clsx from "clsx";
import type { Tag, TagCategory } from "@/entities/tags";
import { Circle, Diamond, Square, Triangle } from "lucide-react";

interface Props {
	category?: TagCategory;
	activeTagId?: string;
	tag?: Tag;
}

function getTagIcon(category?: TagCategory) {
	const props = { className: "size-3", strokeWidth: 2 }

	switch (category) {
		case "camera":
			return <Circle {...props} />;
		case "film":
			return <Diamond {...props} />;
		case "form":
			return <Square {...props} />;
		case "format":
			return <Triangle {...props} />;
		default:
			return "#";
	}
}

export default function TagLink({
	category,
	activeTagId: selectedTagId,
	tag,
}: Readonly<Props>) {
	if (!tag) {
		return null;
	}

	return (
		<li>
			<a
				className={clsx(
					{ "text-accent bg-accent-background": tag.id === selectedTagId },
					"px-1 link link-hover flex items-center gap-1 rounded-sm",
				)}
				href={`/tags/${tag.id}`}
			>
				{getTagIcon(category)}
				{tag.name}
			</a>
		</li>
	)
}
