import {
	type PostForm,
	type Post,
	postSchemaForm,
} from "@/entities/posts";
import { updatePost } from "@/services/client-api/posts";
import { getImgUrl } from "@/lib/api/get-img-url";
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

interface Props {
	post: Post
}

function Component({
	post,
}: Props) {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<PostForm>(postSchemaForm, {
		alt: post.alt,
		caption: post.caption,
		file: new File([], ''),
		published: post.published,
		tags: post.expand?.tags.map(tag => tag.name) || [],
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
		queryFn: () => updatePost(formData.values, post.id),
		queryKey: ['posts/update', post.id],
		retry: false,
	});

	/**
	 * On success, redirect to home page.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = `/posts/${post.id}`;
		}
	}, [isSuccess])

	return (
		<form
			className="flex flex-col gap-1"
			encType="multipart/form-data"
			id="update-post"
			name="update-post"
			onSubmit={handleSubmit}
		>

			{error && <Alert className="mb-4" type="error" content={error.message} />}

			<FileInput
				defaultImgUrl={getImgUrl(post.id, post.file, '650x650f')}
				error={formData.errors.file}
				label="Image"
				name='file'
				onChange={v => updateField('file', v)}
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
					disabled={isFetching}
				>
					Update
				</button>
			</div>
		</form>
	);
}

export default function PostUpdateForm(props: Props) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
