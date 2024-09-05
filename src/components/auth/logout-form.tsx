import { logOut } from "@/services/client-api/auth";
import { useMutation } from "@tanstack/react-query";
import QueryWrapper from "@/components/query-wrapper";

function Component() {
	const { mutate } = useMutation({
		mutationFn: () => logOut(),
		onSuccess: () => {
			window.location.href = `/`;
		}
	})

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		mutate();
	}

	return (
		<form
			className="flex flex-col gap-1"
			name="logout"
			onSubmit={handleSubmit}
		>
			<button type="submit">Logout</button>
		</form>
	)
}

export default function SignupForm() {
	return <QueryWrapper><Component /></QueryWrapper>
}
