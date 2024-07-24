import { deletePost } from "@/services/client-api/posts";
import { getImgUrl } from "@/lib/api/get-img-url"
import { type Post, postSchemaFormDelete, type PostFormDelete } from "@/entities/posts"
import { useEffect } from "react"
import { useForm } from "@/hooks/use-form"
import { useQuery } from "@tanstack/react-query"
import Alert from "@/components/ui/alert"
import QueryWrapper from "@/components/query-wrapper"

interface Props {
	post: Post
}

function Component({ post }: Props) {
	/**
	 * Form
	 */
	const { formData, isValid, validate } = useForm<PostFormDelete>(postSchemaFormDelete, {
		id: post.id
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
		queryFn: () => deletePost(formData.values),
		queryKey: ['posts'],
		retry: false,
	});

	/**
	 * On success, redirect to homepage.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/';
		}
	}, [isSuccess])

	return (
		<>
			<form
				className="flex flex-col gap-4"
				id="delete-post"
				name="delete-post"
				onSubmit={handleSubmit}
			>
				{error && <Alert className="col-span-2" type="error" content={error.message} />}

				<p className="text-xl">Are you sure you want to delete this post?</p>

				<img
					src={getImgUrl(post.id, post.file, '650x650f')}
					alt={post.alt}
				/>

				<p className="text-lg">This will delete the post permanently. You cannot undo this action.</p>

				<div className="col-span-2 flex items-center justify-center gap-x-12 mt-2">
					<a
						className="link link-hover"
						href={`/posts/${post.id}`}
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
		</>
	)
}

export default function PostDeleteForm(props: Props) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
