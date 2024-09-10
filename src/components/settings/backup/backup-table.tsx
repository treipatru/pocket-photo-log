import { Download } from "lucide-react";
import type { Backup } from "@prisma/client";
import BackupDeleteForm from "@/components/settings/backup/backup-delete-form";
import BackupRestoreForm from "@/components/settings/backup/backup-restore-form";

type Props = {
	backups: Backup[];
}

export default function BackupTable({
	backups,
}: Readonly<Props>) {
	return (
		<div className="overflow-x-auto w-full">
			<table className="table">
				<thead>
					<tr>
						<th>File</th>
						<th className="w-44">Size</th>
						<th className="w-44"></th>
					</tr>
				</thead>

				<tbody>
					{backups.map((backup) => (
						<tr
							className="group"
							key={backup.id}
						>
							<td>{backup.fileName}</td>

							<td>{(backup.size / 1024 / 1024).toFixed(2)} MB</td>

							<td className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in ">
								<a
									className="btn btn-sm btn-square btn-outline"
									href={`/api/backups/${backup.id}`}
								>
									<Download size="18" />
								</a>

								<BackupDeleteForm backup={backup} />

								<BackupRestoreForm backup={backup} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
