import { deleteBackup } from "@/services/client-api/backups";
import { type Backup } from "@prisma/client";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { X } from "lucide-react";
import Dialog from "@/components/ui/dialog";
import QueryWrapper from "@/components/query-wrapper"

type Props = {
	backup: Backup
}

function Component({ backup }: Readonly<Props>) {
	const [showModal, setShowModal] = useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: deleteBackup,
		onSuccess: () => {
			window.location.href = `/cms/settings`;
		}
	});

	return (
		<div>
			<Dialog isOpen={showModal} title="Are you sure you want to delete this backup?">

				<p>This will delete the backup <strong>{backup.fileName}</strong> permanently.</p>

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
						onClick={() => mutate(backup.id)}
					>
						Delete
					</button>
				</div>
			</Dialog>

			<button
				className="btn btn-sm btn-square btn-outline"
				disabled={isPending}
				onClick={() => setShowModal(true)}
			>

				<X size="18" />
			</button>
		</div>
	)
}

export default function BackupDeleteForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
