import QueryWrapper from "@/components/query-wrapper";
import Alert from "@/components/ui/alert";
import type { Tag, TagFormDelete } from "@/entities/tags"
import { useMutation } from "@tanstack/react-query";
import { deleteTag } from "@/services/client-api/tags";

type Props = {
	onCancel: () => void;
	tag: Tag;
}

function Component({
	onCancel,
	tag
}: Readonly<Props>) {
	const { mutate, isPending, error } = useMutation({
		mutationFn: (tag: TagFormDelete) => deleteTag({ id: tag.id }),
		onSuccess: () => {
			window.location.reload();
		}
	})


	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		mutate(tag)
	}

	return (
		<form
			className="flex flex-col gap-4"
			id="delete-tag"
			name="delete-tag"
			onSubmit={handleSubmit}
		>
			{error && <Alert className="col-span-2" type="error" content={error.message} />}

			<p>This will delete the tag <strong>{tag.name}</strong> permanently.</p>

			{!!tag.post_count && tag.post_count > 0 && (
				<p className="text-red-500">This tag is used in {tag.post_count} posts.</p>
			)}

			<p>This action cannot be undone.</p>

			<div className="col-span-2 flex items-center justify-center gap-x-4 mt-2">
				<button
					className="btn"
					onClick={onCancel}
					type="button"
				>
					Cancel
				</button>

				<button
					className="btn btn-error"
					disabled={isPending}
					type='submit'
				>
					Delete
				</button>
			</div>
		</form>
	)
}

export default function TagDeleteForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
