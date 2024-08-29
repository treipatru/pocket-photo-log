import type { Post } from "@/entities/posts";

type PostCaptionProps = {
	caption: Post["caption"];
};

export default function PostCaption({ caption }: Readonly<PostCaptionProps>) {
	if (!caption) return null;

	return (
		<figcaption className="text-base font-normal break-all w-full pl-1">
			{caption}
		</figcaption>
	)
}
