import { type Settings, type SettingsSchemaFormUpdate, settingsSchemaFormUpdate } from "@/entities/settings";
import { updateSettings } from "@/services/client-api/settings";
import { useEffect } from "react";
import { useForm } from "@/hooks/use-form";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/ui/input";
import QueryWrapper from "@/components/query-wrapper";

interface Props {
	settings: Settings
}

function Component({
	settings
}: Readonly<Props>) {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<SettingsSchemaFormUpdate>(settingsSchemaFormUpdate, {
		...settings
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();
	}

	/**
	 * Query
	 */
	const { isFetching, isSuccess } = useQuery({
		enabled: isValid,
		queryFn: () => updateSettings(formData.values),
		queryKey: ['settings/update'],
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
		<form
			className="flex flex-col gap-4"
			id="update-settings"
			name="update-settings"
			onSubmit={handleSubmit}
		>
			<Input
				error={formData.errors.TITLE}
				label="Site title"
				name='TITLE'
				onInput={v => updateField('TITLE', v.currentTarget.value)}
				type="text"
				value={formData.values.TITLE}
			/>

			<Input
				error={formData.errors.DESCRIPTION}
				label="Site description"
				name='DESCRIPTION'
				onInput={v => updateField('DESCRIPTION', v.currentTarget.value)}
				type="text"
				value={formData.values.DESCRIPTION}
			/>

			<button
				className="btn btn-primary mt-4"
				type='submit'
				disabled={isFetching}
			>
				{isFetching && <span className="loading loading-spinner"></span>}
				Update
			</button>
		</form>
	)
}

export default function SettingsUpdateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
