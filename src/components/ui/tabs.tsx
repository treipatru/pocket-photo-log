import React, { useCallback, useState } from 'react';

type TabProps = {
	children: React.ReactNode;
	name: string;
	onSelect?: () => void;
	selected?: boolean;
};

export function Tab({
	children,
	name,
	onSelect,
	selected = false,
}: Readonly<TabProps>) {
	return (
		<>
			<input
				aria-label={name}
				className="tab"
				checked={selected}
				id={name}
				name={name}
				onChange={onSelect}
				role="tab"
				type="radio"
			/>
			<div
				role="tabpanel"
				className="tab-content bg-base-100 border-base-300 rounded-box p-6"
			>
				{children}
			</div>
		</>
	);
}

type TabPanelProps = {
	children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
	defaultSelectedTab: string;
};

export function Tabs({ children, defaultSelectedTab }: Readonly<TabPanelProps>) {
	const [selectedTabId, setSelectedTabId] = useState<string | null>(defaultSelectedTab);

	const handleTabSelect = useCallback((tabId: string) => {
		setSelectedTabId(tabId);
	}, []);

	console.log(selectedTabId)
	return (
		<div
			className="tabs tabs-lifted"
			role="tablist"
		>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === Tab) {
					return React.cloneElement(child, {
						selected: child.props.name === selectedTabId,
						onSelect: () => handleTabSelect(child.props.name),
					});
				}

				console.warn('Tabs component only accepts Tab components as children');
				return null;
			})}
		</div>
	);
}
