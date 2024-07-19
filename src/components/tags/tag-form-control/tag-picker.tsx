import type { Tag } from '@/lib/api/types';
import {
	useEffect,
	useRef,
	useState,
} from 'preact/hooks';

interface Props {
	onInput: (str: string) => void;
	onSelect: (tag: Tag) => void;
	options: Tag[];
}

export default function TagPicker({
	onInput,
	onSelect,
	options,
}: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSelect = (tag: Tag) => {
		onSelect(tag);
		setIsFocused(false);
	};

	const toggleFocused = () => {
		setIsFocused(!isFocused);
	};

	const handleInput = (input: string) => {
		onInput(input);
	};

	useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	const handleKeyDown = (e: KeyboardEvent) => {
		const submitKeys = ['Enter', 'Tab', 'Space'];

		if (submitKeys.includes(e.key)) {
			e.preventDefault();

			if (options.length > 0) {
				handleSelect(options[0]);
				return;
			}

			const query = inputRef.current?.innerHTML;
			handleSelect({
				id: '',
				name: query || '',
			});
		}
	};

	return (
		<>
			{!isFocused
				? (
					<button
						class="btn btn-outline btn-sm"
						onClick={toggleFocused}
						onFocus={toggleFocused}
						type="button"
					>
						Add tag
					</button>
				)
				: (
					<div class="dropdown dropdown-open">
						<span
							autofocus
							class="input input-bordered input-primary input-sm inline-block"
							contenteditable
							onInput={e => handleInput(e.currentTarget.innerHTML)}
							onKeyDown={e => handleKeyDown(e)}
							ref={inputRef}
							role="textbox"
							tabindex={0}
						>
						</span>

						{options.length > 0
							&& (
								<ul tabindex={0} class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
									{options
										.toSpliced(5)
										.map((option) => {
											return (
												<li>
													<a onClick={() => handleSelect(option)}>
														{option.name}
													</a>
												</li>
											);
										})}
								</ul>
							)}
					</div>
				)}
		</>
	);
}
