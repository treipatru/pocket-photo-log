interface Props {
	error?: string;
	name: string;
}

export default function FormError({ error, name }: Readonly<Props>) {
	if (!error) return null;

	return (
		<div
			className='text-error text-sm'
			id={`${name}-error`}
		>
			{error}
		</div>
	)
}
