import type { Tag } from "@/entities/tags"
import { MoreVertical } from "lucide-react";

type TagCmsTableProps = {
	onDeleteTag: (tag: Tag) => void;
	onUpdateTag: (tag: Tag) => void;
	tags: Tag[];
}
export default function TagCmsTable({
	onDeleteTag,
	onUpdateTag,
	tags,
}: Readonly<TagCmsTableProps>) {
	return (
		<table className="table table-zebra table-sm font-normal">
			<thead>
				<tr>
					<th>Name</th>
					<th className="w-[100px]">Count</th>
					<th className="w-[30px]"></th>
				</tr>
			</thead>

			<tbody>
				{
					tags.map((tag) => (
						<tr
							className="group hover"
							key={tag.id}
						>
							<td>
								<a className="link link-hover" href={`/tags/${tag.id}`}>
									{tag.name}
								</a>
							</td>

							<td>{tag.post_count}</td>

							<th className="group-hover:opacity-100">

								<div className="dropdown dropdown-end">
									{/*
										* This is a workaround, to make the dropdown focusable on Safari
										* @see https://daisyui.com/components/dropdown/
										*/
									}
									<div
										className="btn btn-xs btn-square btn-ghost"
										role="button"
										tabIndex={0}
									>
										<MoreVertical size="16" />
									</div>

									<ul
										className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] w-24 p-2 shadow"
										tabIndex={0}
									>
										<li>
											<button
												className="btn btn-ghost btn-sm w-full"
												onClick={() => onUpdateTag(tag)}
											>
												Edit
											</button>
										</li>

										<li>
											<button
												className="btn btn-ghost btn-sm w-full"
												onClick={() => onDeleteTag(tag)}
											>
												Delete
											</button>
										</li>
									</ul>
								</div>
							</th>
						</tr>
					))
				}
			</tbody>
		</table>
	)
};
