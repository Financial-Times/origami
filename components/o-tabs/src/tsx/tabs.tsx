export interface Tab {
	heading: string;
	content: string;
	id?: string;
}

export interface TabProps {
	tabs: Tab[];
	type: 'primary' | 'secondary';
	theme?: '' | 'inverse';
	size?: '' | 'big';
	updateUrlHash?: boolean;
}

export function Tabs({
	tabs = [
		{
			heading: 'Tab 1',
			content: 'Tab content 1',
			id: 'demo-tab-1'
		},
		{
			heading: 'Tab 2',
			content: 'Tab content 2',
			id: 'demo-tab-2'
		},
		{
			heading: 'Tab 3',
			content: 'Tab content 3',
			id: 'demo-tab-3'
		},
	],
	type = 'secondary',
	theme = '',
	size = '',
	updateUrlHash = true
}: TabProps) {
	const classNames = ['o-tabs', 'o-tabs--buttontabs'];
	const dataAttributes = {};

	if(type) {
		classNames.push(`o-tabs--${type}`);
	}

	if(theme) {
		classNames.push(`o-tabs--${theme}`);
	}

	if(size) {
		classNames.push(`o-tabs--${size}`);
	}

	if(updateUrlHash) {
		dataAttributes['data-o-tabs-update-url'] = true;
	}

	return (<>
		<div data-o-component="o-tabs" role="tablist" className={classNames.join(' ')} {...dataAttributes}>
			{tabs.map((tab, index) => {
				return <a role="tab" key={`tab-${index}`} aria-controls={tab.id || `tab-${index}`} href={`#${tab.id || index}`}>
					{tab.heading}
				</a>
			})}
		</div>
		{tabs.map((tab, index) => {
		return <div id={tab.id || `tab-${index}`} key={`panel-${index}`} className="o-tabs__tabpanel">
			{tab.content}
		</div>
		})}
	</>);
}
