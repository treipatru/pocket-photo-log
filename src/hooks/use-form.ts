import { type ZodSchema } from "zod";
import { useState } from "react";

export function useForm<T>(schema: ZodSchema, initialData: T) {
	type K = keyof T;

	/**
	 * Create the form state and updater
	 */
	const [formData, setFormData] = useState<T>(initialData);

	const updateField = <K extends keyof T>(field: K, value: T[K]) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	/**
	 * Create the validation state and updater
	 */
	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<K, string>>
	>({});

	const validate = () => {
		const data = formData;
		const validation = schema.safeParse(data);

		if (validation.success) {
			setValidationErrors({});
			return {};
		}
		const fieldErrors = validation.error.flatten().fieldErrors;
		const errors: Partial<Record<K, string>> = {};

		for (const key in fieldErrors) {
			const error = fieldErrors[key];

			if (error) {
				// We only get the first error message
				errors[key as K] = error[0];
			}
		}

		setValidationErrors(errors);
	};

	return {
		formData,
		updateField,
		validate,
		validationErrors,
	};
}
