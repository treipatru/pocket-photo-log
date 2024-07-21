import Input from "@/components/ui/input"
import { useForm } from "@/hooks/use-form"
import { userLoginSchema, type UserLogin } from "@/entities/users"
import { useState } from "react"
import Alert from "@/components/ui/alert";

export default function LoginForm() {
	const [formError, setFormError] = useState<string | null>(null);
	const { formData, updateField, validate, validationErrors } = useForm<UserLogin>(userLoginSchema, {
		email: '',
		password: '',
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();

		const hasErrors = Object.keys(validationErrors).length > 0;

		if (hasErrors) {
			return;
		}
		setFormError(null);

		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			window.location.href = '/'
		} else {
			const { message } = await response.json();
			setFormError(message)
		}
	}

	return (
		<form
			className="flex flex-col gap-1"
			name="login"
			onSubmit={handleSubmit}
		>
			{!!formError && <Alert className="mb-4" type="error" content={formError} />}

			<Input
				error={validationErrors.email}
				label="Email"
				name='email'
				onInput={v => updateField('email', v.currentTarget.value)}
				required
				type="email"
				value={formData.email}
			/>

			<Input
				error={validationErrors.password}
				label="Password"
				name='password'
				onInput={v => updateField('password', v.currentTarget.value)}
				required
				type="password"
				value={formData.password}
			/>

			<button className="btn mt-4">Submit</button>
		</form>
	)
}
