import { useState } from "react";
import FormError from "@/components/ui/form-error";

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
	const [imagePreview, setImagePreview] = useState<string | null>(null)

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
			setImagePreview(null);
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
					accept="image/*"
					className="file-input grow file-input-bordered w-full max-w-xs"
					onChange={handleImageChange}
					type="file"
				/>
			</label>

			<div className="bg-muted w-full min-h-60">
				{imagePreview && (
					<img
						id="imagePreview"
						src={imagePreview}
						alt="Image Preview"
					/>
				)}
			</div>

			{error && <FormError error={error} name={inputProps.name} />}
		</>
	)
}
