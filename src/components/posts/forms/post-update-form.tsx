import { getImgUrl } from "@/lib/get-img-url";
import { postSchemaFormUpdate, type Post, type PostFormUpdate } from "@/entities/posts";
import { updatePost } from "@/services/client-api/posts";
import { useForm } from "@/hooks/use-form";
import { useMutation } from "@tanstack/react-query";
import Alert from "@/components/ui/alert";
import imageExtractMetadata from "@/utils/images/image-extract-metadata";
import FileInput from "@/components/ui/file-input";
import Input from "@/components/ui/input";
import QueryWrapper from "@/components/query-wrapper";
import TagFormControl from "@/components/tags/tag-form-control/tag-form-control";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";

interface Props {
	post: Post
}

function Component({ post }: Readonly<Props>) {
	/**
	 * Form
	 */
	const { formData, updateField, validate } = useForm<PostFormUpdate>(postSchemaFormUpdate, {
		alt: post.alt,
		caption: post.caption,
		file: new File([], ''),
		published: post.published,
		shotOn: post.shotOn.toISOString(),
		tags: post.tags.map(tag => tag.name) || [],
	});

	const { mutate, isPending, error } = useMutation({
		mutationFn: () => updatePost(post.id, formData.values),
		onSuccess: () => {
			window.location.href = `/posts/${post.id}`;
		}
	})

	const handleFileChange = async (file: File) => {
		if (file) {
			// Update the file field first.
			updateField('file', file);

			// Parse the image metadata and replace previous form values.
			const { shotOn, tags } = await imageExtractMetadata(file);
			updateField('shotOn', shotOn ?? '');
			updateField('tags', tags);
		}
	}

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const isValid = validate();

		if (isValid) {
			mutate();
		}
	}

	return (
		<form
			className="flex flex-col gap-1"
			encType="multipart/form-data"
			id="update-post"
			name="update-post"
			onSubmit={handleSubmit}
		>

			<FileInput
				defaultImgUrl={getImgUrl(post.imageUrl, 'MD')}
				error={formData.errors.file}
				label="Image"
				name='file'
				onChange={handleFileChange}
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
				disabled
				label="Created on"
				name="created_on"
				onInput={() => { }}
				type="date"
				value={post.createdAt.toISOString().substring(0, 10)}
			/>

			<Input
				error={formData.errors.shotOn}
				label="Shot on"
				name='shotOn'
				onInput={v => updateField('shotOn', v.currentTarget.value)}
				type="date"
				value={formData.values.shotOn?.substring(0, 10)}
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

			<div className="flex items-center justify-center gap-x-12 mt-1 pt-4 border-t">
				<a
					className="link link-hover"
					href={`/posts/${post.id}`}
				>
					Cancel
				</a>

				<button
					className="btn btn-primary"
					type='submit'
					disabled={isPending}
				>
					{isPending && <span className="loading loading-spinner"></span>}
					Update
				</button>
			</div>
		</form>
	);
}

export default function PostUpdateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
