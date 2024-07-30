import { useState } from 'react';
import TagDropdown from "@/components/tags/tag-form-control/tag-dropdown"

interface Props {
	onSelect: (tag: string) => void;
	value: string[];
}

export default function TagPicker({
	onSelect,
	value,
}: Props) {
	const [showDropdown, setShowDropdown] = useState(false);

	const handleSelect = (tag: string) => {
		onSelect(tag);
		setShowDropdown(false);
	};

	return (
		<>
			{!showDropdown
				? (
					<button
						className="btn btn-outline btn-sm"
						onClick={() => setShowDropdown(true)}
						onFocus={() => setShowDropdown(true)}
						type="button"
					>
						Add tag
					</button>
				)
				: (
					<TagDropdown
						onCancel={() => setShowDropdown(false)} value={value}
						onSelect={handleSelect}
					/>
				)
			}
		</>
	);
}
