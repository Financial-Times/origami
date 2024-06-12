import type {Meta} from '@storybook/react';
import {Summary as SummaryTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: SummaryTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children']},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/design/5ATknbGociZMlnNXX4sy4f/Whitelabel---Origami-(o3)?node-id=3-2&m=dev',
};

export const Summary = StoryTemplates.Summary;
Summary.parameters = {
	design: DesignParams,
};
