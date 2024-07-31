import Alert from "@/components/ui/alert";
import QueryWrapper from "@/components/query-wrapper"
import { pageSchemaForm, type Page, type PageForm } from "@/entities/pages"
import PagesEditor from "@/components/pages/pages-editor"
import Input from "@/components/ui/input"
import { useForm } from "@/hooks/use-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { updatePage } from "@/services/client-api/pages";

interface Props {
	page: Page
}

function Component({ page }: Props) {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<PageForm>(pageSchemaForm, {
		content: page.content,
		name: page.name,
		slug: page.slug,
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
		queryFn: () => updatePage(formData.values, page.id),
		queryKey: ['pages/update', page.slug],
		retry: false,
	});

	/**
	 * On success, redirect to updated page.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = `/pages/${page.slug}`;
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
				<Input
					className="col-span-1"
					error={formData.errors.name}
					label="Name"
					name="name"
					onInput={v => updateField('name', v.currentTarget.value)}
					type="text"
					value={formData.values.name}
				/>

				<Input
					className="col-span-1"
					error={formData.errors.slug}
					label="Slug"
					name="slug"
					onInput={v => updateField('slug', v.currentTarget.value)}
					type="text"
					value={formData.values.slug}
				/>

				<PagesEditor
					className="col-span-2"
					onInput={v => updateField('content', v)}
					value={formData.values.content}
				/>


				{error && <Alert className="col-span-2" type="error" content={error.message} />}

				<div className="col-span-2 flex items-center justify-center gap-x-12 mt-1 pt-4 border-t">
					<a
						className="link link-hover"
						href={`/pages/${page.slug}`}
					>
						Cancel
					</a>

					<button
						className="btn btn-primary"
						disabled={isFetching}
						type='submit'
					>
						{isFetching && <span className="loading loading-spinner"></span>}
						Update
					</button>
				</div>
			</form>
		</>
	)
}

export default function PageUpdateForm(props: Props) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
