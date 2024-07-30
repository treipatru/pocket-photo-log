import { useState } from "react";
import FormError from "@/components/ui/form-error";
import clsx from "clsx";

interface Props {
	classes?: string;
	error?: string;
	label: string;
	name: string;
	onChange: (file: InstanceType<typeof File>) => void;
	defaultImgUrl?: string;
	required?: boolean;
	value?: InstanceType<typeof File>;
}

export default function FileInput(props: Props) {
	const { value, label, error, onChange, defaultImgUrl, ...inputProps } = props;
	const [imagePreview, setImagePreview] = useState<string | null>(defaultImgUrl || null)

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
			setImagePreview(defaultImgUrl || null);
		}
	};

	const handleImageReset = (event: React.SyntheticEvent) => {
		event.preventDefault();
		onChange(new File([], ''));
		setImagePreview(defaultImgUrl || null);
	};

	return (
		<>
			<label className={`form-control w-full max-w-xs, ${props.classes}`}>
				<div className="label">
					<span className="label-text">{label}</span>
				</div>

				<div className='flex items-center justify-between'>
					<input
						{...inputProps}
						accept=".jpg,.jpeg,.png,.webp,.avif"
						className="file-input file-input-bordered max-w-xs inline-block"
						onChange={handleImageChange}
						type="file"
					/>

					{!!value?.name && (
						<button className="btn btn-square btn-outline" onClick={handleImageReset}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					)}
				</div>

				<div className={clsx("w-full min-h-60 mt-4", { "bg-muted": !imagePreview })}>
					{imagePreview && (
						<img
							id="imagePreview"
							src={imagePreview}
							alt="Image Preview"
						/>
					)}
				</div>
			</label>

			{error && <FormError error={error} name={inputProps.name} />}
		</>
	)
}
