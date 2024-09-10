import { Eye, Heart } from "lucide-react";
import { likePost } from "@/services/client-api/posts";
import { useState } from "react";
import clsx from "clsx";
import type { Post } from "@/entities/posts";

type PostStatsProps = Pick<Post, 'likes' | 'views' | 'id'> & {
	className?: string;
};

export default function PostStats({
	id,
	className,
	likes,
	views,
}: Readonly<PostStatsProps>) {
	const [displayLikes, setDisplayLikes] = useState(likes);
	const [isFetching, setIsFetching] = useState(false);

	const handleClick = async () => {
		if (isFetching) return;
		setIsFetching(true);

		try {
			const res = await likePost(id);
			setDisplayLikes(res.likes);
		} catch (_) {
			console.error(_);
		} finally {
			setIsFetching(false);
		}
	}


	return (
		<div className={clsx("flex font-normal text-sm items-center gap-1 justify-end text-muted", className)}>
			<div
				className="tooltip w-6 flex flex-col items-center"
				data-tip="Post views"
			>
				<Eye size={18} />
				<span>{views}</span>
			</div>

			<button
				className="flex flex-col items-center w-10 group tooltip tooltip-bottom"
				data-tip="Post likes"
				disabled={isFetching}
				onClick={handleClick}
			>
				<Heart size={18} className="group-hover:text-warning group-hover:scale-150 duration-200 ease-in-out" />
				<span>{displayLikes}</span>
			</button>

		</div>
	)
}
