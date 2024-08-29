import { Eye, Heart } from "lucide-react";
import QueryWrapper from "@/components/query-wrapper";
import type { Post } from "@/entities/posts";
import { updatePost } from "@/services/client-api/posts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import clsx from "clsx";

type PostStatsProps = {
	post: Post
	className?: string;
};

function Component({
	className,
	post,
}: Readonly<PostStatsProps>) {
	const [shouldFetch, setShouldFetch] = useState(false);

	/**
	 * The likes should use an optimistic UI, but with updates from the server.
	 * TODO: Implement optimistic UI.
	 */
	const [likes, setLikes] = useState(post.likes);

	const { isFetching } = useQuery({
		enabled: shouldFetch,
		queryFn: () => updatePost({ likes }, post.id),
		queryKey: ['posts/update', post.id],
		retry: false,
	});

	useEffect(() => {
		if (shouldFetch) {
			setShouldFetch(false);
		}
	}, [shouldFetch]);

	const handleClick = () => {
		setLikes(likes + 1);
		setShouldFetch(true);
	}

	return (
		<div className={clsx("flex font-normal text-sm items-center gap-1 justify-end text-muted", className)}>
			<div className="tooltip w-6 flex flex-col items-center" data-tip="Post views" >
				<Eye size={18} />
				<span>{post.views}</span>
			</div>


			<button
				className="flex flex-col items-center w-10 group tooltip tooltip-bottom"
				data-tip="Post likes"
				disabled={isFetching}
				onClick={handleClick}
			>
				<Heart size={18} className="group-hover:text-warning group-hover:scale-150 duration-200 ease-in-out" />
				<span>{likes}</span>
			</button>

		</div>
	)
}

export default function PostStats(props: Readonly<PostStatsProps>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
