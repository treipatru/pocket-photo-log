import { deleteTag } from "@/services/client-api/tags";
import { type Tag, tagSchemaFormDelete, type TagFormDelete } from "@/entities/tags"
import { useEffect } from "react"
import { useForm } from "@/hooks/use-form"
import { useQuery } from "@tanstack/react-query"
import Alert from "@/components/ui/alert"
import QueryWrapper from "@/components/query-wrapper"

interface Props {
	tag: Tag
}

function Component({ tag }: Readonly<Props>) {
	/**
	 * Form
	 */
	const { formData, isValid, validate } = useForm<TagFormDelete>(tagSchemaFormDelete, {
		id: tag.id
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();
	}

	/**
	 * Query
	 */
	const { error, isFetching, isSuccess } = useQuery({
		enabled: isValid,
		queryFn: () => deleteTag(formData.values),
		queryKey: ['tags'],
		retry: false,
	});

	/**
	 * On success, redirect to tags listing.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/cms/tags';
		}
	}, [isSuccess])

	return (
		<form
			className="flex flex-col gap-4"
			id="delete-tag"
			name="delete-tag"
			onSubmit={handleSubmit}
		>
			{error && <Alert className="col-span-2" type="error" content={error.message} />}

			<p className="text-xl">Are you sure you want to delete this tag?</p>

			<p>This will delete the data permanently. You cannot undo this action.</p>

			<p>Deleting tag <em>{tag.name}</em> used in {tag.post_count} posts.</p>

			<div className="col-span-2 flex items-center justify-center gap-x-12 mt-2">
				<a
					className="link link-hover"
					href={"/cms/tags"}
				>
					Cancel
				</a>

				<button
					className="btn btn-error"
					disabled={isFetching}
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
