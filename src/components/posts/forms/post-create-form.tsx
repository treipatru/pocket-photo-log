import { postSchemaFormCreate, type PostFormCreate } from "@/entities/posts";
import { createPost } from "@/services/client-api/posts";
import { useForm } from "@/hooks/use-form";
import { useMutation } from "@tanstack/react-query";
import Alert from "@/components/ui/alert";
import extractMetadataFromImg from "@/utils/extract-metadata-from-img";
import FileInput from "@/components/ui/file-input";
import Input from "@/components/ui/input";
import QueryWrapper from "../../query-wrapper";
import TagFormControl from "@/components/tags/tag-form-control/tag-form-control";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";

function Component() {
	const { formData, isValid, updateField, validate } = useForm<PostFormCreate>(postSchemaFormCreate, {
		alt: '',
		caption: '',
		file: new File([], ''),
		published: true,
		shot_on: '',
		tags: [],
	});

	const { mutate, isPending, error } = useMutation({
		mutationFn: (newPost: PostFormCreate) => createPost(newPost),
		onSuccess: (res) => {
			window.location.href = `/posts/${res.id}`;
		}
	})

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();

		if (isValid) {
			mutate(formData.values);
		}
	}

	const handleFileChange = async (file: File) => {
		if (file) {
			// Update the file field first.
			updateField('file', file);

			// Parse the image metadata and replace previous form values.
			const { shotOn, tags } = await extractMetadataFromImg(file);
			updateField('shot_on', shotOn ?? '');
			updateField('tags', tags);
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
			<FileInput
				error={formData.errors.file}
				label="Image"
				name='file'
				onChange={handleFileChange}
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
				disabled={isPending}
			>
				{isPending && <span className="loading loading-spinner"></span>}
				Create
			</button>
		</form>
	);
}

export default function PostCreateForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
