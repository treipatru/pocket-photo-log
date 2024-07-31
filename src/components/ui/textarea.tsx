import FormError from '@/components/ui/form-error';

type Props = {
	name: string;
	label: string;
	placeholder?: string;
	value: string | undefined;
	error?: string;
	required?: boolean;
	onInput: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function Textarea(props: Readonly<Props>) {
	const { value, label, error, ...inputProps } = props;

	return (
		<label
			className="form-control"
			htmlFor={props.name}
		>
			<div className="label">
				<span className="label-text">{props.label}</span>
			</div>

			<textarea
				{...inputProps}
				aria-errormessage={`${props.name}-error`}
				aria-invalid={!!props.error}
				className="textarea textarea-bordered h-24"
				id={props.name}
				name={props.name}
				placeholder={props.placeholder}
				required={props.required}
				value={props.value || ''}
			></textarea>

			<FormError name={props.name} error={props.error} />
		</label>
	);
}
