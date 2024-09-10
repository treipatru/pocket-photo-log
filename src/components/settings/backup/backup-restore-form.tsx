import { RefreshCw } from "lucide-react";
import { restoreBackup } from "@/services/client-api/backups";
import { type Backup } from "@prisma/client";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import QueryWrapper from "@/components/query-wrapper"

type Props = {
	backup: Backup
}

function Component({ backup }: Readonly<Props>) {
	const [showModal, setShowModal] = useState(false);
	const [answer, setAnswer] = useState('RESTORE');

	const { isPending, mutate } = useMutation({
		mutationFn: restoreBackup,
		onSuccess: () => {
			window.location.href = `/cms/settings`;
		}
	});

	return (
		<div>
			<Dialog isOpen={showModal} title="Are you sure you want to restore this backup?">
				<p>This action will restore the backup <strong>{backup.fileName}</strong>.</p>

				<p className="text-error font-bold text-lg py-4">All your data will be replaced by the contents of the backup. This includes posts, pages, users and other backups.</p>

				<Input
					label="Type 'RESTORE' to confirm"
					name='answer'
					onInput={(event) => setAnswer(event.target.value)}
					type='text'
					value={answer}
				/>

				<div className="flex gap-4 mt-8">
					<button
						className="btn btn-outline"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</button>

					<button
						className="btn btn-error"
						disabled={answer !== 'RESTORE' || isPending}
						onClick={() => mutate(backup.id)}
					>
						{isPending && <span className="loading loading-spinner"></span>}
						Replace all my data with this backup
					</button>
				</div>
			</Dialog>

			<button
				className="btn btn-sm btn-square btn-outline"
				disabled={isPending}
				onClick={() => setShowModal(true)}
			>
				<RefreshCw size="18" />
			</button>
		</div>
	)
}

export default function BackupRestoreForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
