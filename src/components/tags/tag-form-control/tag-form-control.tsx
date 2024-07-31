import TagBadge from '@/components/tags/tag-form-control/tag-badge';
import TagPicker from '@/components/tags/tag-form-control/tag-picker';

interface Props {
	onChange: (tags: string[]) => void;
	value?: string[];
}

export default function TagFormControl({
	onChange,
	value = [],
}: Readonly<Props>) {
	const handleSelect = (tag: string) => {
		onChange([...value, tag]);
	};

	const handleDelete = (tag: string) => {
		onChange(value.filter(t => t !== tag));
	};

	return (
		<div className="form-control w-full">
			<div className="label">
				<span className="label-text">Tags</span>
			</div>

			<div className="flex flex-wrap gap-2">
				{value.map(tag => (
					<TagBadge
						key={tag}
						tag={tag}
						onDelete={handleDelete}
					/>
				))}

				<TagPicker
					value={value}
					onSelect={handleSelect}
				/>
			</div>
		</div>
	);
}
