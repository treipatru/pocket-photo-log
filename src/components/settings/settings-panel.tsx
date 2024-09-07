import { Tab, Tabs } from "@/components/ui/tabs";
import { type Settings } from "@/entities/settings";
import BackupSection from "@/components/settings/backup/backup-section";
import SettingsUpdateForm from "@/components/settings/settings-update-form";
import type { Backup } from "@prisma/client";

interface SettingsPanelProps {
	backups: Backup[];
	settings: Settings
}

export default function SettingsPanel({
	backups,
	settings,
}: Readonly<SettingsPanelProps>) {
	return (
		<Tabs defaultSelectedTab="Backup">
			<Tab name="General">
				<SettingsUpdateForm settings={settings} />
			</Tab>

			<Tab name="Backup">
				<BackupSection initialBackups={backups} />
			</Tab>
		</Tabs>
	)
}
