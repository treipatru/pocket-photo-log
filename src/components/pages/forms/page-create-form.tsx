import { createPage } from "@/services/client-api/pages";
import { pageCreateSchema, type PageCreate } from "@/entities/pages"
import { useForm } from "@/hooks/use-form"
import { useMutation } from "@tanstack/react-query"
import FormFooter from "@/components/ui/forms/form-footer";
import Input from "@/components/ui/input"
import PagesEditor from "@/components/pages/pages-editor"
import QueryWrapper from "@/components/query-wrapper"

function Component() {
	const { formData, updateField, validate } = useForm<PageCreate>(pageCreateSchema, {
		content: '',
		name: '',
		slug: '',
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const isValid = validate();

		if (isValid) {
			mutate(formData.values)
		}
	}

	const { error, isPending, mutate } = useMutation({
		mutationFn: createPage,
		onSuccess: (res) => {
			window.location.href = `/pages/${res.slug}`;
		}
	});

	return (
		<form
			className="grid gap-4 grid-cols-2"
			id="create-page"
			name="create-page"
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
				actionText="Create Page"
				error={error?.message}
				isFetching={isPending}
			/>
		</form>
	)
}

export default function PageCreateForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
