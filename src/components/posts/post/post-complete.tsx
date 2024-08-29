import TagBox from "@/components/tags/tag-box/tag-box";
import type { Post } from "@/entities/posts"
import { getImgUrl } from "@/lib/get-img-url";
import PostCaption from "@/components/posts/post/components/post-caption";
import PostStats from "@/components/posts/post/components/post-stats";

type PostCompleteProps = {
	post: Post;
}

export default function PostComplete({
	post
}: Readonly<PostCompleteProps>) {
	const { id, file, alt, caption, shot_on, expand } = post;

	return (
		<article
			className="grid grid-cols-12 max-w-[1000]px gap-y-2 gap-x-4 bg-muted-background"
		>
			<figure className="col-span-12 flex items-center flex-col">
				<img
					alt={alt}
					className="max-h-[78vh] mb-2"
					loading="lazy"
					src={getImgUrl({ id, file }, 'large')}
				/>

				<PostCaption caption={caption} />
			</figure>

			<TagBox
				className="col-span-9 md:col-span-11"
				date={shot_on}
				tags={expand?.tags}
			/>

			<PostStats className="col-span-3 md:col-span-1" post={post} />
		</article>
	)
}
