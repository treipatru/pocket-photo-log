import Alert from "@/components/ui/alert"
import QueryWrapper from "@/components/query-wrapper"
import { pageSchemaFormDelete, type Page, type PageFormDelete } from "@/entities/pages"
import { useForm } from "@/hooks/use-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { deletePage } from "@/services/client-api/pages";

interface Props {
	page: Page
}

function Component({ page }: Readonly<Props>) {
	/**
	 * Form
	 */
	const { formData, isValid, validate } = useForm<PageFormDelete>(pageSchemaFormDelete, {
		id: page.id
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
		queryFn: () => deletePage(formData.values),
		queryKey: ['pages'],
		retry: false,
	});

	/**
	 * On success, redirect to homepage.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/';
		}
	}, [isSuccess])

	return (
		<form
			className="flex flex-col gap-4"
			id="delete-page"
			name="delete-page"
			onSubmit={handleSubmit}
		>
			{error && <Alert className="col-span-2" type="error" content={error.message} />}

			<p className="text-xl">Are you sure you want to delete this page?</p>

			<p>This will delete the page <strong>{page.name}</strong> permanently. You cannot undo this action.</p>

			<div className="col-span-2 flex items-center justify-center gap-x-12 mt-2">
				<a
					className="link link-hover"
					href={`/pages/${page.slug}`}
				>
					Cancel
				</a>

				<button
					className="btn btn-error"
					disabled={isFetching}
					type='submit'
				>
					Delete
				</button>
			</div>
		</form>
	)
}

export default function PageDeleteForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
