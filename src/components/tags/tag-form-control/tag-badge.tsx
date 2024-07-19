import { type Tag } from '@/lib/api/types';

interface Props {
	tag: Tag;
	onDelete: (tag: Tag) => void;
}

export default function TagBadge({
	onDelete,
	tag,
}: Props) {
	const handleDelete = (tag: Tag) => {
		onDelete(tag);
	};

	return (
		<button
			class="btn-sm p-0"
			onClick={() => handleDelete(tag)}
			type="button"
		>
			<div class="input input-bordered input-primary input-sm">
				<span class="mr-1">
					{tag.name}
				</span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-4 w-4 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					>
					</path>
				</svg>
			</div>
		</button>
	);
}
