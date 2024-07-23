import Input from "@/components/ui/input"
import { useForm } from "@/hooks/use-form"
import { userLoginSchema, type UserLogin } from "@/entities/users"
import { useEffect } from "react"
import Alert from "@/components/ui/alert";
import QueryWrapper from "@/components/query-wrapper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logIn } from "@/services/client-api/auth";

function Component() {
	/**
	 * Form
	 */
	const { formData, isValid, updateField, validate } = useForm<UserLogin>(userLoginSchema, {
		email: '',
		password: '',
	});

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		validate();
		queryClient.invalidateQueries({ queryKey: ['auth'] })
	}

	/**
	 * Query
	 */
	const queryClient = useQueryClient();
	const { isFetching, error, isSuccess } = useQuery({
		enabled: isValid,
		queryFn: () => logIn(formData.values),
		queryKey: ['auth'],
		retry: false,
	})

	/**
	 * On success, redirect to home page.
	 */
	useEffect(() => {
		if (isSuccess) {
			window.location.href = '/'
		}
	}, [isSuccess])

	return (
		<form
			className="flex flex-col gap-1"
			name="login"
			onSubmit={handleSubmit}
		>
			{!!error && <Alert className="mb-4" type="error" content={error.message} />}

			<Input
				error={formData.errors.email}
				label="Email"
				name='email'
				onInput={v => updateField('email', v.currentTarget.value)}
				required
				type="email"
				value={formData.values.email}
			/>

			<Input
				error={formData.errors.password}
				label="Password"
				name='password'
				onInput={v => updateField('password', v.currentTarget.value)}
				required
				type="password"
				value={formData.values.password}
			/>

			<button className="btn mt-4" disabled={isFetching}>Submit</button>
		</form>
	)
}

export default function LoginForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
