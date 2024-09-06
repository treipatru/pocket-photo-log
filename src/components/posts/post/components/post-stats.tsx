import { Eye, Heart } from "lucide-react";
import { likePost } from "@/services/client-api/posts";
import type { Stat } from "@prisma/client";
import { useState } from "react";
import clsx from "clsx";

type PostStatsProps = {
	stats: Stat;
	className?: string;
};

export default function PostStats({
	className,
	stats,
}: Readonly<PostStatsProps>) {
	const [likes, setLikes] = useState(stats.likes);
	const [isFetching, setIsFetching] = useState(false);

	const handleClick = async () => {
		if (isFetching) return;
		setIsFetching(true);

		try {
			const res = await likePost(stats.postId);
			setLikes(res.likes);
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
				<span>{stats.views}</span>
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
