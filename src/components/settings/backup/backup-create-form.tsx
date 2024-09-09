import { createBackup } from "@/services/client-api/backups";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Dialog from "@/components/ui/dialog";
import QueryWrapper from "@/components/query-wrapper";
import type { Backup } from "@prisma/client";

type Props = {
	onCreated: (backup: Backup) => void;
}

function Component({ onCreated }: Readonly<Props>) {
	const [showModal, setShowModal] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: () => createBackup(),
		onSuccess: (res) => {
			onCreated(res);
		}
	})

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setShowModal(false);
		mutate();
	}

	return (
		<>
			<Dialog isOpen={showModal} title="Create new backup?">
				<div className="flex flex-col gap-4">
					<p>This will create a zipped back up of the DB and the contents of the file storage.</p>

					<p>For the <strong>entire</strong> duration of the backup, the application will <span className="text-error">not be responsive</span></p>

					<form
						className="flex gap-4 mt-8"
						id="new-backup"
						name="new-backup"
						onSubmit={handleSubmit}
					>
						<button
							className="btn btn-outline"
							disabled={isPending}
							onClick={() => setShowModal(false)}
							type="button"
						>
							Cancel
						</button>

						<button
							className="btn btn-primary"
							disabled={isPending}
							type='submit'
						>
							{isPending && <span className="loading loading-spinner"></span>}
							Create backup
						</button>
					</form>
				</div>
			</Dialog >

			<button
				className="btn"
				disabled={isPending}
				onClick={() => setShowModal(true)}
				type='button'
			>
				{isPending
					? <>
						<span className="loading loading-spinner"></span>
						<span>Creating...</span>
					</>
					: <span>New</span>
				}
			</button>
		</>

	)
}

export default function BackupCreateForm(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
