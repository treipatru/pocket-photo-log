import ExploreTags from "@/components/explore/explore-tags";
import ExploreYears from "@/components/explore/explore-years";
import { type Tag } from "@/entities/tags"
import { type PostsPerYear } from "@/entities/api-client";

type ExploreSectionProps = {
	tags: Tag[];
	years: PostsPerYear[];
}

export default function ExploreSection({
	tags,
	years,
}: Readonly<ExploreSectionProps>) {
	const cameras = tags.filter((tag) => tag.name.startsWith("camera:"));
	const countries = tags.filter((tag) => tag.name.startsWith("co:"));
	const places = tags.filter((tag) => tag.name.startsWith("pl:"));
	const sets = tags.filter((tag) => tag.name.startsWith("set:"));
	const otherTags = tags.filter((tag) => !RegExp(/^\S+:\s/).exec(tag.name));

	return (
		<section className="flex flex-col gap-y-12">

			<ExploreTags tags={sets} title="Featured" tagCategory="set" />

			<ExploreTags tags={otherTags} title="Tags" />

			<ExploreYears years={years.map((y) => y.year).filter((y) => y !== null)} />

			<ExploreTags tags={places} title="Places" tagCategory="pl" />

			<ExploreTags tags={countries} title="Countries" tagCategory="co" />

			<ExploreTags tags={cameras} title="Cameras" tagCategory="camera" />
		</section>
	)
}
