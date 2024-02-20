import type {Meta} from '@storybook/react';
import {Heading} from '../../src/tsx/heading';

import '../../main.css';

import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: Heading,
	decorators: [
		Story => (
			<div className="o3-brand-core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
	argTypes: {
		level: {
			options: ['1', '2', '3', '4', '5', '6'],
		},
	},
} as Meta;

export const HeadingsStory = {
	args: {
		level: '1',
	},
	render: args => <Heading level={args.level}>Don't settle for</Heading>,
};
