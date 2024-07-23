import {
	useEffect,
	useRef,
	useState,
} from 'react';
import TagDropdown from "@/components/tags/tag-form-control/tag-dropdown"

interface Props {
	onSelect: (tag: string) => void;
	value: string[];
}

export default function TagPicker({
	onSelect,
	value,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);

	/**
	 * Make sure the input is focused when the dropdown is open
	 */
	useEffect(() => {
		if (showDropdown && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showDropdown]);

	const handleSelect = (tag: string) => {
		onSelect(tag || '');
		setShowDropdown(false);
	};

	return (
		<div>
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
					<TagDropdown onSelect={handleSelect} onCancel={() => setShowDropdown(false)} value={value} />
				)}
		</div>
	);
}
