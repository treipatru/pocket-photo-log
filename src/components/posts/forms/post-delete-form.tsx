import { deletePost } from "@/services/client-api/posts";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import Dialog from "@/components/ui/dialog";
import QueryWrapper from "@/components/query-wrapper"
import type { Post } from "@/entities/posts";

type Props = {
	post: Post;
}

function Component({ post }: Readonly<Props>) {
	const [showModal, setShowModal] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			window.location.href = `/`;
		}
	});

	return (
		<div>
			<Dialog isOpen={showModal} title="Are you sure you want to delete this post?">

				<p>This will delete the data permanently. You cannot undo this action.</p>


				<div className="flex gap-4 mt-8">
					<button
						className="btn btn-outline"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>

					<button
						className="btn btn-error"
						disabled={isPending}
						onClick={() => mutate(post.id)}
					>
						Delete
					</button>
				</div>
			</Dialog>

			<button
				className="btn btn-sm btn-outline"
				disabled={isPending}
				onClick={() => setShowModal(true)}
			>
				Delete
			</button>
		</div>
	)
}

export default function PostDeleteForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
