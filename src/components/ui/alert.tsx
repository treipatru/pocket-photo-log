import clsx from "clsx";

interface Props {
	className?: string;
	content: string;
	type: "error";
}

export default function Alert({ className, content, type }: Props) {
	return (
		<div
			aria-live="polite"
			className={clsx("alert", { "alert-error": type === "error" }, className)}
			role="alert"
		>
			<span>{content}</span>
		</div>
	)
}
