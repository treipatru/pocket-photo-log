import { type Post } from "@/entities/posts"
import clsx from "clsx";
import PostDeleteForm from "@/components/posts/forms/post-delete-form";

type PostAdminMenuProps = {
	className?: string;
	post: Post;
}

export default function PostAdminMenu({
	className,
	post
}: Readonly<PostAdminMenuProps>) {
	return (
		<div className={clsx("flex gap-4 mr-2 mt-2 items-center justify-end", className)}>

			<a
				className="btn btn-sm btn-outline"
				href={`/cms/posts/${post.id}/update`}
			>
				Update
			</a>

			<PostDeleteForm post={post} />
		</div>
	)
}
