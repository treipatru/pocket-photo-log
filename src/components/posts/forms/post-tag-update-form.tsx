import type { Tag } from "@/entities/tags";
import QueryWrapper from "@/components/query-wrapper";
import { useState } from "react";
import { useForm } from "@/hooks/use-form";
import { Save, X } from "lucide-react";
import { postSchemaFormUpdate, type PostFormUpdate } from "@/entities/posts";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/services/client-api/posts";
import { sanitizeTagNames } from "@/entities/tags";

interface Props {
	postId: string;
	tags: Tag[];
}

function Component({
	postId,
	tags = [],
}: Readonly<Props>) {
	/**
	 * Form
	 */
	const [isEditing, setIsEditing] = useState(false);
	const { formData, isValid, updateField, validate } = useForm<PostFormUpdate>(postSchemaFormUpdate, {
		tags: tags.map(t => t.name),
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();

		if (isValid) {
			mutate({ id: postId, payload: formData.values });
		}
	}

	const handleCancel = () => {
		updateField('tags', tags.map(tag => tag.name));
		setIsEditing(false);
	}

	const { mutate, isPending } = useMutation({
		mutationFn: ({
			id,
			payload
		}: { id: string, payload: PostFormUpdate }) => updatePost(id, payload),
		onSuccess: () => {
			setIsEditing(false);
			updateField('tags', sanitizeTagNames(formData.values.tags, 'arr'));
		}
	});

	return (
		<div className="flex items-center gap-1">
			<form
				className="w-full pr-2"
				encType="multipart/form-data"
				id="update-post"
				name="update-post"
				onSubmit={handleSubmit}
			>
				<input
					className="input input-bordered input-sm w-full"
					onClick={() => { setIsEditing(true) }}
					onInput={(e) => updateField('tags', e.currentTarget.value.toLowerCase().split(','))}
					type="text"
					value={formData.values.tags?.join(',')}
				/>
			</form>

			<div className="flex items-center gap-x-1">
				{isEditing && (
					<>
						<button
							disabled={isPending}
							className="btn btn-ghost btn-sm"
							onClick={handleCancel}
						>
							<X size={16} />
						</button>

						<button
							disabled={isPending}
							className="btn btn-ghost btn-sm" onClick={handleSubmit}
						>
							<Save size={16} />
						</button>
					</>
				)
				}
			</div>
		</div>
	)
}

export default function PostTagUpdateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
