import { useState } from "react";

interface Props {
	classes?: string;
	label: string;
	name: string;
	required?: boolean;
	value: InstanceType<typeof File>;
	error?: string;
	onChange: (file: InstanceType<typeof File>) => void;
}

export default function FileInput(props: Props) {
	const { value, label, error, onChange, ...inputProps } = props;
	const [imagePreview, setImagePreview] = useState('')

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target?.files?.[0];

		if (file) {
			onChange(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview('');
		}
	};

	return (
		<>
			<label className={`form-control w-full max-w-xs, ${props.classes}`}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>

				<input
					{...inputProps}
					type="file"
					onChange={handleImageChange}
					className="file-input grow file-input-bordered w-full max-w-xs"
					accept="image/*"
				/>
			</label>

			<div className="bg-muted w-full min-h-60">
				{!!imagePreview.length && (
					<img
						id="imagePreview"
						src={imagePreview}
						alt="Image Preview"
					/>
				)}
			</div>
		</>
	)
}
