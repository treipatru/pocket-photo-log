interface Props {
	tag: string;
	onDelete: (tag: string) => void;
}

export default function TagBadge({
	onDelete,
	tag,
}: Readonly<Props>) {
	return (
		<button
			className="btn-sm p-0"
			onClick={() => onDelete(tag)}
			type="button"
		>
			<div className="input input-bordered input-primary input-sm">
				<span className="mr-1">
					{tag}
				</span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block h-4 w-4 stroke-current"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					>
					</path>
				</svg>
			</div>
		</button>
	);
}
