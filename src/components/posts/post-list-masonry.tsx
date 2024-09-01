import { getImgUrl } from "@/lib/get-img-url"
import { type Pagination } from "@/entities/api-client";
import { type Post } from "@/entities/posts"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Measure from 'react-measure';

type PostListMasonryProps = Pick<Pagination, "page" | "perPage"> & {
	posts: Post[];
	tagId: string;
}

export default function PostListMasonry({
	page,
	perPage,
	posts,
	tagId,
}: Readonly<PostListMasonryProps>) {
	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }} >
			<Masonry
				columnsCount={2}
				gutter="10px"
			>

				{posts.map((post, index) => {
					/**
					 * The post index represents the position of the post in the collection of
					 * posts for a given tag. This allows us to display individual posts
					 * in their own page, while also providing a way to navigate between posts.
					 */
					const postIndex = index + 1
						+ (page - 1) * perPage

					return (
						/**
						 * When React Measure detects a change in an item’s height, it will trigger
						 * a re-measure of the item. react-responsive-masonry will then adjust the
						 * layout accordingly, ensuring that items are properly aligned and that
						 * the overall layout maintains a balanced and aesthetic look.
						 */
						<Measure
							key={post.id}
						>
							{({ measureRef }) => (
								<div ref={measureRef}>
									<a
										aria-label={"Post"}
										className=""
										href={`/tags/${tagId}/${postIndex}`}
									>
										<img
											alt={post.alt}
											/**
											 * The width and height are specified as the full size of the image,
											 * however the actual render is controlled by the masonry grid.
											 * By specifying the full size of the image, we can ensure that
											 * the space is reserved for the image before it is loaded.
											 */
											className={`w-[${post.width}px] h-[${post.height}px] bg-muted-background`}
											loading="lazy"
											src={getImgUrl({ id: post.id, file: post.file }, 'medium')}
										/>
									</a>
								</div>
							)}
						</Measure>
					)
				})}
			</Masonry>
		</ResponsiveMasonry>
	)
}
