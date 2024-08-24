type ExploreSectionProps = {
	years: number[];
}
export default function ExploreTags({
	years
}: Readonly<ExploreSectionProps>) {
	return (
		<div>
			<h2 aria-label="Years"></h2>

			<div className="divider uppercase">Years</div>

			<ul className='flex mt-4 gap-x-4 gap-y-2 flex-wrap'>
				{
					years.map((year) => (
						<li key={year}>
							<a
								className='link link-hover font-normal'
								href={`/posts?year=${year}`}>{year}</a>
						</li>
					))
				}
			</ul>
		</div>
	)
}
