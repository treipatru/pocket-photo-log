import {
	type PostCreate,
	postDto,
	postSchemaCreate
} from "@/entities/posts";
import { useForm } from "@/hooks/use-form";
import { useState } from "react";
import Alert from "@/components/ui/alert";
import FileInput from "@/components/ui/file-input";
import Input from "@/components/ui/input";
import TagFormControl from "@/components/tags/tag-form-control/tag-form-control";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";

interface Props {
	tags: string[]
}

export default function PostCreateForm({
	tags
}: Props) {
	const [formError, setFormError] = useState<string | null>(null);
	const { formData, updateField, validate, validationErrors } = useForm<PostCreate>(postSchemaCreate, {
		alt: '',
		caption: '',
		file: new File([], ''),
		published: true,
		tags: []
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setFormError(null);
		validate();

		const hasErrors = Object.keys(validationErrors).length > 0;
		if (hasErrors) {
			return;
		}

		const body = postDto.create.transformToServer(formData);

		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				body
			});

			if (!response.ok) {
				const { message } = await response.json();
				throw new Error(message)
			}

			window.location.href = '/'
		} catch (_) {
			setFormError('Failed to create post.');
		}
	}

	return (
		<form
			className="flex flex-col gap-1"
			encType="multipart/form-data"
			id="create-post"
			name="create-post"
			onSubmit={handleSubmit}
		>

			{formError && <Alert className="mb-4" type="error" content={formError} />}

			<FileInput
				classes="mb-8"
				error={validationErrors.file}
				label="Image"
				name='file'
				onChange={v => updateField('file', v)}
				required
				value={formData.file}
			/>

			<Textarea
				error={validationErrors.caption}
				label="Caption"
				name='caption'
				onInput={v => updateField('caption', v.currentTarget.value)}
				value={formData.caption}
			/>

			<Input
				error={validationErrors.alt}
				label="Alt"
				name='alt'
				onInput={v => updateField('alt', v.currentTarget.value)}
				type="text"
				value={formData.alt}
			/>

			<TagFormControl
				allTags={tags}
				error={validationErrors.tags}
				onChange={v => updateField('tags', v)}
				value={formData.tags}
			/>

			<Toggle
				name='published'
				value={formData.published}
				label="Publish"
				onChange={v => updateField('published', v.currentTarget.checked)}
			/>

			<button className="btn mt-1" type='submit'>Create</button>
		</form>
	);
}
