import { signUp } from "@/services/client-api/auth";
import { useForm } from "@/hooks/use-form"
import { useMutation } from "@tanstack/react-query";
import { userSignupSchema, type UserSignup } from "@/entities/users"
import Alert from "@/components/ui/alert";
import Input from "@/components/ui/input"
import QueryWrapper from "@/components/query-wrapper";

function Component() {
	const { formData, updateField, validate } = useForm<UserSignup>(userSignupSchema, {
		username: '',
		password: '',
	});

	const { mutate, isPending, error } = useMutation({
		mutationFn: () => signUp(formData.values),
		onSuccess: () => {
			window.location.href = `/`;
		}
	})

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const isValid = validate();
		if (isValid) {
			mutate();
		}
	}

	return (
		<form
			className="flex flex-col gap-1"
			name="signup"
			onSubmit={handleSubmit}
		>
			<Input
				error={formData.errors.username}
				label="Username"
				name='username'
				onInput={v => updateField('username', v.currentTarget.value)}
				required
				type="text"
				value={formData.values.username}
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

			{error && <Alert className="my-4" type="error" content={error.message} />}

			<button
				className="btn mt-4"
				disabled={isPending}
			>
				Submit
			</button>
		</form>
	)
}

export default function SignupForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
