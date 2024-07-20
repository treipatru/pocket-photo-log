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
		<div>
			<label
				htmlFor={props.name}
				className="input input-bordered flex items-center gap-2"
			>
				{props.label} {props.required && <span>*</span>}

				<input
					{...inputProps}
					className="grow"
					name={props.name}
					placeholder={props.placeholder}
					aria-errormessage={`${props.name}-error`}
					aria-invalid={!!props.error}
					id={props.name}
					value={props.value || ''}
				/>

			</label>

			<FormError name={props.name} error={props.error} />
		</div>
	);
}
