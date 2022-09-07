import {useEffect} from 'react';
import javascript from '../main';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Example} from '../src/tsx/example';
import './example.scss';

export default {
	title: 'Components/o-example',
	component: Example,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof Example>;

const ExampleStory = args => {
	useEffect(() => {
		javascript.init()
	})
	return <Example {...args} />
};

export const DefaultExample: ComponentStory<typeof Example> = ExampleStory.bind(
	{}
);
const themeOptions = ['', 'inverse']
const controlLabels: Record<string, string> = {
	'': 'Default',
	inverse: 'Inverse',
}

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND || 'core';

if (Brand === 'core') {
	themeOptions.push('b2c')
	controlLabels.b2c = 'B2C'
}
DefaultExample.argTypes = {
	theme: {
		name: 'Theme',
		options: themeOptions,
		control: {
			type: 'select',
			labels: controlLabels
		}
	}
}
