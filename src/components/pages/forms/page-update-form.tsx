import { pageUpdateSchema, type PageUpdate } from "@/entities/pages"
import { updatePage } from "@/services/client-api/pages";
import { useForm } from "@/hooks/use-form"
import { useMutation } from "@tanstack/react-query"
import FormFooter from "@/components/ui/forms/form-footer";
import Input from "@/components/ui/input"
import PagesEditor from "@/components/pages/pages-editor"
import QueryWrapper from "@/components/query-wrapper"
import type { Page } from "@prisma/client";

interface Props {
	page: Page
}

function Component({ page }: Readonly<Props>) {
	const { formData, updateField, validate } = useForm<PageUpdate>(pageUpdateSchema, {
		...page
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const isValid = validate();

		if (isValid) {
			mutate(formData.values)
		}
	}

	const { error, isPending, mutate } = useMutation({
		mutationFn: updatePage,
		onSuccess: (res) => {
			window.location.href = `/pages/${res.slug}`;
		}
	});

	return (
		<form
			className="grid gap-4 grid-cols-2"
			id="update-page"
			name="update-page"
			onSubmit={handleSubmit}
		>
			<Input
				className="col-span-2 md:col-span-1"
				error={formData.errors.name}
				label="Name"
				name="name"
				onInput={v => updateField('name', v.currentTarget.value)}
				required
				type="text"
				value={formData.values.name}
			/>

			<Input
				className="col-span-2 md:col-span-1"
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

			<FormFooter
				actionText="Update Page"
				cancelUrl={`/pages/${page.slug}`}
				error={error?.message}
				isFetching={isPending}
			/>
		</form>
	)
}

export default function PageUpdateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
