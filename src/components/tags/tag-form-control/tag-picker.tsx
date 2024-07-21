import {
	useEffect,
	useRef,
	useState,
} from 'react';

interface Props {
	onInput: (str: string) => void;
	onSelect: (tag: string) => void;
	options: string[];
}

export default function TagPicker({
	onInput,
	onSelect,
	options,
}: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSelect = (tag: string) => {
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

	const handleKeyDown = (e: React.KeyboardEvent) => {
		const submitKeys = ['Enter', 'Tab', 'Space'];

		if (submitKeys.includes(e.key)) {
			e.preventDefault();

			if (options.length > 0) {
				handleSelect(options[0]);
				return;
			}

			const query = inputRef.current?.innerHTML;
			handleSelect(query || '');
		}
	};

	return (
		<>
			{!isFocused
				? (
					<button
						className="btn btn-outline btn-sm"
						onClick={toggleFocused}
						onFocus={toggleFocused}
						type="button"
					>
						Add tag
					</button>
				)
				: (
					<div className="dropdown dropdown-open">
						<span
							autoFocus
							className="input input-bordered input-primary input-sm inline-block"
							contentEditable
							onInput={e => handleInput(e.currentTarget.innerHTML)}
							onKeyDown={e => handleKeyDown(e)}
							ref={inputRef}
							role="textbox"
							tabIndex={0}
						>
						</span>

						{options.length > 0
							&& (
								<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
									{options
										.toSpliced(5)
										.map((option) => {
											return (
												<li key={option}>
													<a onClick={() => handleSelect(option)}>
														{option}
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
