import { type Tag, type TagCategory } from '@/entities/tags';

type ExploreSectionProps = {
	tags: Tag[];
	title: string;
	tagCategory?: TagCategory;
}
export default function ExploreSection({
	tagCategory,
	tags,
	title,
}: Readonly<ExploreSectionProps>) {
	return (
		<div>
			<h2 aria-label={title}></h2>

			<div className="divider uppercase">{title}</div>

			<ul className='flex mt-4 gap-x-4 gap-y-2 flex-wrap'>
				{
					tags.map((tag) => (
						<li key={tag.id}>
							<a
								className='link link-hover font-normal'
								href={`/tags/${tag.id}`}>{!tagCategory
									? tag.name
									: tag.name.replace(`${tagCategory}: `, "")
								}
							</a>
						</li>
					))
				}
			</ul>
		</div>
	)
}
