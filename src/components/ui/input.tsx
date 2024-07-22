import FormError from '@/components/ui/form-error';
import type React from 'react';

type Props = {
	name: string;
	type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
	label: string;
	placeholder?: string;
	value: string | undefined;
	error?: string;
	required?: boolean;
	onInput: React.ChangeEventHandler<HTMLInputElement>;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input(props: Props) {
	const { value, label, error, ...inputProps } = props;

	return (
		<label
			className="form-control w-full"
			htmlFor={props.name}
		>
			<div className="label">
				<span className="label-text">{props.label} {props.required && <span>*</span>}</span>
			</div>

			<input
				{...inputProps}
				className="input input-bordered w-full"
				name={props.name}
				placeholder={props.placeholder}
				aria-errormessage={`${props.name}-error`}
				aria-invalid={!!props.error}
				id={props.name}
				value={props.value || ''}
			/>

			<FormError name={props.name} error={props.error} />
		</label>
	);
}
