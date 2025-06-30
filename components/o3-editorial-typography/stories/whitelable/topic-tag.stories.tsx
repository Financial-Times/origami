import type {Meta} from '@storybook/react-webpack5';
import {TopicTag as TopicTagTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: TopicTagTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--topic-tag'].figma,
		}
	},
} as Meta;


export const TopicTag = StoryTemplates.TopicTag;
