import {Tabs} from '../src/tsx/tabs';
import {useEffect} from 'react';
import javascript from '../main';
import './tabs.scss';

export default {
	title: 'Components/o-tabs',
	component: Tabs,
	args: {
	},
	parameters: {
		guidelines: {},
		html: {},
	},
};

const Story = args => {
	useEffect(() => {
		let tabs = javascript.init();
		return function cleanup() {
			tabs = Array.isArray(tabs) ? tabs : [tabs];
			tabs.forEach(tab => tab.destroy());
		}
	}, [args.updateUrlHash]);
	return <Tabs {...args} />;
};

export const Default = Story.bind({});
Default.args = {
	tabs: [
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
		}
	],
	type: 'secondary',
	theme: '',
	size: '',
	updateUrlHash: true
};

export const Inverse = Story.bind({});
Inverse.parameters = {
	origamiBackground: 'slate'
};
Inverse.args = {
	tabs: [
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
		}
	],
	type: 'secondary',
	theme: 'inverse',
	size: '',
	updateUrlHash: true
};

export const Big = Story.bind({});
Big.args = {
	tabs: [
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
		}
	],
	type: 'secondary',
	theme: '',
	size: 'big',
	updateUrlHash: true
};
