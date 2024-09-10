import { deletePage } from "@/services/client-api/pages";
import { type Page } from "@prisma/client";
import { useMutation } from "@tanstack/react-query"
import Dialog from "@/components/ui/dialog";
import { useState } from "react";
import QueryWrapper from "@/components/query-wrapper"

type Props = {
	page: Page;
}

function Component({ page }: Readonly<Props>) {
	const [showModal, setShowModal] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: deletePage,
		onSuccess: () => {
			window.location.href = `/`;
		}
	});

	return (
		<div>
			<Dialog isOpen={showModal} title="Are you sure you want to delete this page?">

				<p>This will delete the page <strong>{page.name}</strong> permanently.</p>

				<p>This action cannot be undone.</p>

				<div className="flex gap-4 mt-8">
					<button
						className="btn btn-outline"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>

					<button
						className="btn btn-error"
						disabled={isPending}
						onClick={() => mutate(page.slug)}
					>
						Delete
					</button>
				</div>
			</Dialog>

			<button
				className="btn btn-sm btn-outline"
				disabled={isPending}
				onClick={() => setShowModal(true)}
			>
				Delete
			</button>
		</div>
	)
}

export default function PageDeleteForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
