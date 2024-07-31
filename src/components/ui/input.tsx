import FormError from '@/components/ui/form-error';
import clsx from 'clsx';
import type React from 'react';

type Props = {
	className?: string;
	error?: string;
	label: string;
	name: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onInput: React.ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
	required?: boolean;
	type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
	value: string | undefined;
}

export default function Input(props: Readonly<Props>) {
	const { className, value, label, error, ...inputProps } = props;

	return (
		<label
			className={clsx("form-control w-full", className)}
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
				value={props.value ?? ''}
			/>

			<FormError name={props.name} error={props.error} />
		</label>
	);
}
