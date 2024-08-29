import { getImgUrl } from "@/lib/get-img-url";
import PostCaption from "@/components/posts/post/components/post-caption";
import PostStats from "@/components/posts/post/components/post-stats";
import TagBox from "@/components/tags/tag-box/tag-box";
import type { Post } from "@/entities/posts"
import type { Stat } from "@/entities/stats";

type PostCompleteProps = {
	post: Post;
	stats: Stat | null;
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
	post,
	stats,
}: Readonly<PostCompleteProps>) {
	const { width } = getPostDimension(post)

	return (
		<article
			className="grid grid-cols-12 max-w-[1000]px gap-y-2 gap-x-4 bg-muted-background m-auto"
			style={{ width }}
		>
			<figure className="col-span-12 flex items-center flex-col">
				<img
					alt={post.alt}
					className="mb-2"
					loading="lazy"
					src={getImgUrl({ id: post.id, file: post.file })}
				/>

				<PostCaption caption={post.caption} />
			</figure>

			<TagBox
				className="col-span-9 md:col-span-11"
				date={post.shot_on}
				tags={post.expand?.tags}
			/>

			{stats && (
				<PostStats className="col-span-3 md:col-span-1" stats={stats} />
			)}
		</article>
	)
}
