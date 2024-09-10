import { tagSchemaFormUpdate, type Tag, type TagFormUpdate } from "@/entities/tags"
import { updateTag } from "@/services/client-api/tags";
import { useForm } from "@/hooks/use-form";
import { useMutation } from "@tanstack/react-query";
import Alert from "@/components/ui/alert";
import Input from "@/components/ui/input";
import QueryWrapper from "@/components/query-wrapper";

type Props = {
	onCancel: () => void;
	tag: Tag;
}

function Component({
	onCancel,
	tag
}: Readonly<Props>) {
	const { formData, updateField, validate } = useForm<TagFormUpdate>(tagSchemaFormUpdate, {
		id: tag.id,
		name: tag.name
	});

	const { mutate, isPending, error } = useMutation({
		mutationFn: () => updateTag(formData.values),
		onSuccess: () => {
			window.location.reload();
		}
	})

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const isValid = validate();
		if (isValid) {
			mutate();
		}
	}

	return (
		<form
			className="flex flex-col gap-4"
			id="update-tag"
			name="update-tag"
			onSubmit={handleSubmit}
		>
			{error && <Alert className="col-span-2" type="error" content={error.message} />}

			<Input
				autocomplete="off"
				error={formData.errors.name}
				label="Name"
				name='name'
				onInput={v => updateField('name', v.currentTarget.value)}
				required
				type="text"
				value={formData.values.name}
			/>

			<div className="col-span-2 flex items-center justify-center gap-x-4 mt-2">
				<button
					className="btn"
					onClick={onCancel}
					type="button"
				>
					Cancel
				</button>

				<button
					className="btn btn-primary"
					disabled={isPending || formData.values.name === tag.name}
					type='submit'
				>
					Update
				</button>
			</div>
		</form>
	)
}

export default function TagUpdateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
