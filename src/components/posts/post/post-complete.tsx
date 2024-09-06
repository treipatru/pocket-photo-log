import { getImgUrl } from "@/lib/get-img-url";
import { type Post } from "@/entities/posts"
import PostAdminMenu from "@/components/posts/post/post-admin-menu";
import PostCaption from "@/components/posts/post/components/post-caption";
import PostStats from "@/components/posts/post/components/post-stats";
import TagBox from "@/components/tags/tag-box/tag-box";
import type { Stat } from "@prisma/client";

type PostCompleteProps = {
	activeTagId?: string;
	post: Post;
	showAdminMenu?: boolean;
	stats?: Stat | null;
}

function getPostDimension(post: Post) {
	const aspectRatio = Number((post.width / post.height).toPrecision(2))

	const style = {
		width: 'auto',
	}

	switch (true) {
		// Landscape
		case aspectRatio > 1:
			style.width = '1000px'
			break;
		// Portrait
		case aspectRatio < 1:
			style.width = '600px'
			break;
		// Square
		case aspectRatio === 1:
			style.width = '850px'
			break;
		// Default
		default:
			break;
	}

	return style
}

export default function PostComplete({
	activeTagId,
	post,
	showAdminMenu = false,
	stats,
}: Readonly<PostCompleteProps>) {
	const { width } = getPostDimension(post)

	return (
		<article
			className='grid grid-cols-12 gap-y-2 gap-x-4 bg-muted-background m-auto pb-2'
			style={{ maxWidth: width }}
		>
			{showAdminMenu && <PostAdminMenu className="col-span-12" post={post} />}

			<figure className="col-span-12 flex items-center flex-col">
				<img
					alt={post.alt}
					className="mb-2"
					style={{ width }}
					src={getImgUrl(post.imageUrl)}
				/>

				<PostCaption caption={post.caption} />
			</figure>

			<TagBox
				activeTagId={activeTagId}
				className="col-span-9 md:col-span-11 px-2"
				date={post.shotOn}
				tags={post.tags}
			/>

			{stats && (
				<PostStats className="col-span-3 md:col-span-1" stats={stats} />
			)}
		</article>
	)
}
