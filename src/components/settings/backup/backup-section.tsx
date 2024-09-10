import { useState } from "react";
import BackupCreateForm from "@/components/settings/backup/backup-create-form";
import BackupTable from "@/components/settings/backup/backup-table";
import QueryWrapper from "@/components/query-wrapper";
import type { Backup } from "@prisma/client";

type Props = {
	initialBackups: Backup[];
}

function Component({ initialBackups }: Readonly<Props>) {
	const [backups, setBackups] = useState(initialBackups);

	const handleCreated = (backup: Backup) => {
		setBackups((prev) => [backup, ...prev]);
	}

	return (
		<div className="flex items-center flex-col gap-y-4">
			{backups.length > 0 && (
				<BackupTable
					backups={backups}
				/>
			)}

			<BackupCreateForm onCreated={handleCreated} />
		</div>
	)
}

export default function BackupSection(props: Readonly<Props>) {
	return <QueryWrapper><Component {...props} /></QueryWrapper>
}
