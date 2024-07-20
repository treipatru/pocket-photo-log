interface Props {
	name: string;
	label: string;
	placeholder?: string;
	value: boolean | undefined;
	error?: string;
	required?: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Toggle(props: Props) {
	const { value, label, error, ...inputProps } = props;

	return (
		<div className="form-control">
			<label
				className="label cursor-pointer"
				htmlFor={props.name}
			>
				<span className="label-text">{props.label}</span>

				{props.required && <span>*</span>}

				<input
					aria-errormessage={`${props.name}-error`}
					aria-invalid={!!props.error}
					checked={props.value}
					className="toggle"
					id={props.name}
					name={props.name}
					required={props.required}
					type="checkbox"
					onChange={props.onChange}
				/>
			</label>

			{props.error && <div id={`${props.name}-error`}>{props.error}</div>}
		</div>
	)
}
