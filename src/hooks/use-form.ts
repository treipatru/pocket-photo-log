import { type ZodSchema } from "zod";
import { useState, useEffect } from "react";

type FormState<T> = {
	formData: {
		errors: {
			[K in keyof T]?: string;
		};
		values: T;
	};
	hasErrors: boolean;
	isValid: boolean;
	updateField: <K extends keyof T>(field: K, value: T[K]) => void;
	validate: () => void;
};

export function useForm<T>(schema: ZodSchema, initialData: T): FormState<T> {
	type K = keyof T;
	type Errors = { [L in keyof T]?: string };

	/**
	 * Internal value to keep track of whether the form has had attempted
	 * validation.
	 */
	const [hasValidated, setHasValidated] = useState(false);

	/**
	 * Form values
	 */
	const [formValues, setFormValues] = useState<T>(initialData);

	/**
	 * Update form value
	 */
	const updateField = <K extends keyof T>(field: K, value: T[K]) => {
		setFormValues((prev) => ({ ...prev, [field]: value }));
	};

	/**
	 * Form errors
	 */
	const [formErrors, setFormErrors] = useState<Errors>({});

	/**
	 * Helper to determine if the form has any errors.
	 */
	const [hasErrors, setHasErrors] = useState(false);

	/**
	 * Form validity
	 */
	const [isValid, setIsValid] = useState(false);

	/**
	 * Validate form
	 */
	const validate = () => {
		const data = formValues;
		const validation = schema.safeParse(data);
		setHasValidated(true);

		if (validation.success) {
			setFormErrors({});
			setIsValid(true);
			return;
		}

		const fieldErrors = validation.error.flatten().fieldErrors;
		const errors: Errors = {};

		for (const key in fieldErrors) {
			const error = fieldErrors[key];

			if (error) {
				// Get the first error message only.
				errors[key as K] = error[0];
			}
		}

		setIsValid(false);
		setFormErrors(errors);
	};

	/**
	 * React to data changes
	 */
	useEffect(() => {
		// Only run if there has been a validation attempt.
		if (!hasValidated) {
			return;
		}

		const errorCount = Object.keys(formErrors).length;

		setHasErrors(errorCount > 0);
		setIsValid(errorCount === 0);
	}, [hasValidated, formErrors]);

	return {
		formData: {
			errors: formErrors,
			values: formValues,
		},
		hasErrors,
		isValid,
		updateField,
		validate,
	};
}
