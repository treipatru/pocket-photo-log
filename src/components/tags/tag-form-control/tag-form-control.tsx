import { type Tag } from '@/entities/tags';
import { useState } from 'react'
import TagBadge from '@/components/tags/tag-form-control/tag-badge';
import TagPicker from '@/components/tags/tag-form-control/tag-picker';

interface Props {
	allTags: string[];
	error?: string;
	onChange: (tags: string[]) => void;
	value: string[];
}

export default function TagFormControl({
	allTags,
	onChange,
	value,
}: Props) {
	const [validOptions, setValidOptions] = useState<string[]>(allTags);

	const handleSelect = (tag: string) => {
		// Prevent creation of empty tags
		if (tag === '') {
			setValidOptions(allTags);
			return;
		}

		// Prevent duplicate tags
		// This concerns new tags only, as existing tags are already filtered out
		if (value.some(t => t === tag)) {
			return;
		}

		onChange([...value, tag]);
		setValidOptions(validOptions.filter(t => t !== tag));
	};

	const handleDelete = (tag: string) => {
		onChange(value.filter(t => t !== tag));
		setValidOptions([...validOptions, tag]
			.toSorted((a, b) => a.localeCompare(b)));
	};

	const handleInput = (str: string) => {
		// Show all options when the input is empty
		if (str === '') {
			setValidOptions(allTags);
			return;
		}

		const newList = allTags.filter(tag => {
			// Filter in tags that match the input
			const isMatch = tag.toLowerCase().includes(str.toLowerCase());
			// Filter out tags that are already selected
			const isNotSelected = !value.some(t => t === tag);
			return isMatch && isNotSelected;
		});

		setValidOptions(newList);
	};

	return (
		<div className="flex gap-2 flex-wrap my-4">
			{value.map(tag => (
				<TagBadge
					key={tag}
					tag={tag}
					onDelete={handleDelete}
				/>
			))}

			<TagPicker
				options={validOptions}
				onSelect={handleSelect}
				onInput={handleInput}
			/>
		</div>
	);
}
