import {
	type PostFormCreate,
	postSchemaFormCreate
} from "@/entities/posts";
import { createPost } from "@/services/client-api/posts";
import { useEffect } from "react";
import { useForm } from "@/hooks/use-form";
import { useQuery } from "@tanstack/react-query";
import Alert from "@/components/ui/alert";
import FileInput from "@/components/ui/file-input";
import Input from "@/components/ui/input";
import QueryWrapper from "../query-wrapper";
import TagFormControl from "@/components/tags/tag-form-control/tag-form-control";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";

function Component() {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<PostFormCreate>(postSchemaFormCreate, {
		alt: '',
		caption: '',
		file: new File([], ''),
		published: true,
		shot_on: '',
		tags: [],
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();
	}

	/**
	 * Query
	 */
	const { error, isFetching, isSuccess } = useQuery({
		enabled: isValid,
		queryFn: () => createPost(formData.values),
		queryKey: ['posts'],
		retry: false,
	});

	/**
	 * On success, redirect to home page.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/'
		}
	}, [isSuccess])

	return (
		<form
			className="flex flex-col gap-1"
			encType="multipart/form-data"
			id="create-post"
			name="create-post"
			onSubmit={handleSubmit}
		>


			<FileInput
				error={formData.errors.file}
				label="Image"
				name='file'
				onChange={v => updateField('file', v)}
				required
				value={formData.values.file}
			/>

			<Textarea
				error={formData.errors.caption}
				label="Caption"
				name='caption'
				onInput={v => updateField('caption', v.currentTarget.value)}
				value={formData.values.caption}
			/>

			<Input
				error={formData.errors.alt}
				label="Alt"
				name='alt'
				onInput={v => updateField('alt', v.currentTarget.value)}
				type="text"
				value={formData.values.alt}
			/>

			<Input
				error={formData.errors.shot_on}
				label="Shot on"
				required
				name='shot_on'
				onInput={v => updateField('shot_on', v.currentTarget.value)}
				type="date"
				value={formData.values.shot_on?.substring(0, 10)}
			/>

			<TagFormControl
				onChange={v => updateField('tags', v)}
				value={formData.values.tags}
			/>

			<Toggle
				name='published'
				value={formData.values.published}
				label="Publish"
				onChange={v => updateField('published', v.currentTarget.checked)}
			/>

			{error && <Alert className="my-4" type="error" content={error.message} />}

			<button
				className="btn mt-1"
				type='submit'
				disabled={isFetching}
			>
				{isFetching && <span className="loading loading-spinner"></span>}
				Create
			</button>
		</form>
	);
}

export default function PostCreateForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
