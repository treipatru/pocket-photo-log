import Alert from "@/components/ui/alert";
import QueryWrapper from "@/components/query-wrapper"
import { pageSchemaForm, type PageForm } from "@/entities/pages"
import PagesEditor from "@/components/pages/pages-editor"
import Input from "@/components/ui/input"
import { useForm } from "@/hooks/use-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { createPage } from "@/services/client-api/pages";

function Component() {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<PageForm>(pageSchemaForm, {
		content: '',
		name: '',
		slug: '',
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
		queryFn: () => createPage(formData.values),
		queryKey: ['cms/create/page'],
		retry: false,
	});

	/**
	 * On success, redirect to home page.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = `/`;
		}
	}, [isSuccess])

	return (
		<>
			<form
				className="grid gap-4 grid-cols-2"
				id="update-page"
				name="update-page"
				onSubmit={handleSubmit}
			>
				{error && <Alert className="col-span-2" type="error" content={error.message} />}

				<Input
					className="col-span-1"
					error={formData.errors.name}
					label="Name"
					name="name"
					onInput={v => updateField('name', v.currentTarget.value)}
					required
					type="text"
					value={formData.values.name}
				/>

				<Input
					className="col-span-1"
					error={formData.errors.slug}
					label="Slug"
					name="slug"
					onInput={v => updateField('slug', v.currentTarget.value)}
					required
					type="text"
					value={formData.values.slug}
				/>

				<PagesEditor
					className="col-span-2"
					onInput={v => updateField('content', v)}
					value={formData.values.content}
				/>

				<div className="col-span-2 flex items-center justify-center gap-x-12 mt-1 pt-4">
					<a
						className="link link-hover"
						href={'/'}
					>
						Cancel
					</a>

					<button
						className="btn btn-primary"
						disabled={isFetching}
						type='submit'
					>
						Create
					</button>
				</div>
			</form>
		</>
	)
}

export default function PageCreateForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
