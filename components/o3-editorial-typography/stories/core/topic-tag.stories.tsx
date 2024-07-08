import type {Meta} from '@storybook/react';
import {TopicTag as TopicTagTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';
import links from '@financial-times/o3-figma-sb-links';

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

export const TopicTag = StoryTemplates.TopicTag;
TopicTag.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-editorial-typography--topic-tag'].figma
	},
};
