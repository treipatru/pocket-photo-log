import { type Post } from "@/entities/posts";
import PostTimelineItem from "@/components/posts/post-timeline/post-timeline-item";

type PostTimelineProps = {
	activeYear?: string;
	posts: Post[];
}

export default function PostTimeline({
	activeYear,
	posts,
}: Readonly<PostTimelineProps>) {
	return (
		<div className="flex flex-col max-w-4xl m-auto">
			<ol className="relative md:border-s md:border-muted-background">
				{
					posts.map((post) => (
						<PostTimelineItem
							activeYear={activeYear}
							key={post.id}
							post={post}
						/>
					))
				}
			</ol>
		</div>
	)
}
