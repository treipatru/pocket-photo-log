import PostComplete from "@/components/posts/post/post-complete";
import PostSetNav from "@/components/posts/posts-set/post-set-nav";
import type { Post } from "@/entities/posts"

type PostInSetProps = {
	activeTagId: string;
	pagination: APIPagination;
	post: Post;
	showAdminMenu?: boolean;
}
export default function PostInSet({
	activeTagId,
	pagination,
	post,
	showAdminMenu = false,
}: Readonly<PostInSetProps>) {

	return (
		<PostSetNav
			{...pagination}
			tagId={activeTagId}
		>
			<PostComplete
				{...post}
				activeTagId={activeTagId}
				showAdminMenu={showAdminMenu}
			/>
		</PostSetNav>
	)
}
