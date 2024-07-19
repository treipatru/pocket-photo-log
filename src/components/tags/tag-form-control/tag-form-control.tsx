import TagBadge from '@/components/tags/tag-form-control/tag-badge';
import TagPicker from '@/components/tags/tag-form-control/tag-picker';
import { type Tag } from '@/entities/tags';
import { useState } from 'preact/hooks';

interface Props {
	name: string;
	allTags: Tag[];
}

export default function TagFormControl({
	name,
	allTags,
}: Props) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [validOptions, setValidOptions] = useState<Tag[]>(allTags);

	const handleSelect = (tag: Tag) => {
		// Prevent creation of empty tags
		if (tag.name === '') {
			setValidOptions(allTags);
			return;
		}

		// Prevent duplicate tags
		// This concerns new tags only, as existing tags are already filtered out
		if (selectedTags.some(t => t.name === tag.name)) {
			return;
		}

		setSelectedTags([...selectedTags, tag]);
		setValidOptions(validOptions.filter(t => t.name !== tag.name));
	};

	const handleDelete = (tag: Tag) => {
		setSelectedTags(selectedTags.filter(t => t.name !== tag.name));
		setValidOptions([...validOptions, tag]
			.toSorted((a, b) => a.name.localeCompare(b.name)));
	};

	const handleInput = (str: string) => {
		// Show all options when the input is empty
		if (str === '') {
			setValidOptions(allTags);
			return;
		}

		const newList = allTags.filter(tag => {
			// Filter in tags that match the input
			const isMatch = tag.name.toLowerCase().includes(str.toLowerCase());
			// Filter out tags that are already selected
			const isNotSelected = !selectedTags.some(t => t.name === tag.name);
			return isMatch && isNotSelected;
		});

		setValidOptions(newList);
	};

	return (
		<div class="flex gap-2 flex-wrap my-4">
			{selectedTags.map(tag => (
				<TagBadge
					tag={tag}
					onDelete={handleDelete}
				/>
			))}

			<TagPicker
				options={validOptions}
				onSelect={handleSelect}
				onInput={handleInput}
			/>

			<input
				type="hidden"
				name={name}
				value={selectedTags.map(t => t.id).join(',')}
			/>

			<input
				type="hidden"
				name={`${name}new`}
				value={selectedTags
					.filter(t => t.id === '')
					.map(t => t.name).join(',')}
			/>
		</div>
	);
}
