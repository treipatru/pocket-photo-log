import { type Tag } from "@/entities/tags";
import { useState } from "react";
import Dialog from "@/components/ui/dialog";
import TagCmsSearch from "@/components/tags/tag-cms-manager/tag-cms-search";
import TagCmsTable from "@/components/tags/tag-cms-manager/tag-cms-table";
import TagDeleteForm from "@/components/tags/forms/tag-delete-form";
import TagUpdateForm from "@/components/tags/forms/tag-update-form";

type TagCmsManagerProps = {
	initialQuery: string;
	tags: Tag[];
}

export default function TagCmsManager({
	initialQuery,
	tags
}: Readonly<TagCmsManagerProps>) {
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [tag, setTag] = useState<Tag | null>(null);

	const handleDeleteTag = async (tag: Tag) => {
		setTag(tag);
		setShowDeleteModal(true);
	}

	const handleUpdateTag = async (tag: Tag) => {
		setTag(tag);
		setShowUpdateModal(true);
	}

	return (
		<>
			<TagCmsSearch initialQuery={initialQuery} />

			<TagCmsTable
				onDeleteTag={handleDeleteTag}
				onUpdateTag={handleUpdateTag}
				tags={tags}
			/>

			{!!tag && showDeleteModal && (
				<Dialog
					isOpen={showDeleteModal}
					title="Are you sure you want to delete this tag?"
				>
					<TagDeleteForm
						onCancel={() => setShowDeleteModal(false)}
						tag={tag}
					/>
				</Dialog>
			)}

			{!!tag && showUpdateModal && (
				<Dialog
					isOpen={showUpdateModal}
					title="Update tag"
				>
					<TagUpdateForm
						onCancel={() => setShowUpdateModal(false)}
						tag={tag}
					/>
				</Dialog>

			)}
		</>
	)
}
