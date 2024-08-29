import TagBox from "@/components/tags/tag-box/tag-box";
import type { Post } from "@/entities/posts"
import { getImgUrl } from "@/lib/get-img-url";
import PostCaption from "@/components/posts/post/components/post-caption";

type PostPreviewProps = {
	activeTagId?: string;
	activeYear?: string;
	post: Post;
}

export default function PostPreview({
	activeTagId,
	activeYear,
	post
}: Readonly<PostPreviewProps>) {
	const { id, file, alt, caption, shot_on, expand } = post;

	return (
		<article className="grid grid-cols-12 gap-y-2 m-auto">
			<figure className="col-span-12 flex flex-col gap-y-2">
				<a
					href={`/posts/${id}`}
					aria-label={"Post"}
					className="w-full"
				>
					<img
						alt={alt}
						className="max-h-[850px]"
						loading="lazy"
						src={getImgUrl({ id, file }, 'medium')}
					/>
				</a>

				<PostCaption caption={caption} />
			</figure>

			<TagBox
				activeTagId={activeTagId}
				activeYear={activeYear}
				className="col-span-12"
				date={shot_on}
				tags={expand?.tags}
			/>
		</article>
	)
}
