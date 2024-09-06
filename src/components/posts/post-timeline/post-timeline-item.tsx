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
	const { id, imageUrl, alt, caption, shotOn, tags } = post;

	return (
		<li className="[&:not(:last-child)]:mb-28 ms-0 md:ms-6">
			<div className="hidden bg-muted-background -start-2 size-4 rounded-full md:flex items-center justify-center absolute">
				<div className="bg-base-100 size-3 rounded-full" />
			</div>

			<div className="flex items-center mb-3 text-sm font-normal leading-none text-muted ">
				<TagBox
					activeTagId={activeTagId}
					activeYear={activeYear}
					className="col-span-12"
					date={shotOn}
					onlyDateTime
					tags={tags}
				/>
			</div>


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
							src={getImgUrl(imageUrl, 'MD')}
						/>
					</a>

					<PostCaption caption={caption} />
				</figure>

			</article>
		</li>
	)
}
