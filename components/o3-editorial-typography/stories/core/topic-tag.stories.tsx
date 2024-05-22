import type {Meta} from '@storybook/react';
import {TopicTag as TopicTagTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-editorial-typography',
	component: TopicTagTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/5ATknbGociZMlnNXX4sy4f/Whitelabel---Design-System?type=design&node-id=4717-652&mode=design&t=Y50jCZbAtgxH2F3S-4',
};

export const TopicTag = StoryTemplates.TopicTag;
TopicTag.parameters = {
	design: DesignParams,
};
