import Alert from "@/components/ui/alert";

type FormFooterProps = {
	actionText: string;
	cancelText?: string;
	cancelUrl?: string;
	error?: string;
	isFetching: boolean;
}
export default function FormFooter({
	actionText,
	cancelText = 'Cancel',
	cancelUrl = '/',
	error,
	isFetching,
}: Readonly<FormFooterProps>) {
	return (
		<>
			{error && <Alert className="col-span-2" type="error" content={error} />}

			<div className="col-span-2 flex items-center justify-center gap-x-12 mt-1 pt-4">
				<a
					className="link link-hover"
					href={cancelUrl}
				>
					{cancelText}
				</a>

				<button
					className="btn btn-primary"
					disabled={isFetching}
					type='submit'
				>
					{isFetching && <span className="loading loading-spinner"></span>}
					{actionText}
				</button>
			</div>
		</>
	)
}
