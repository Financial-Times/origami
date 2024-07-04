import type {Meta} from '@storybook/react';
import {Quote as QuoteTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: QuoteTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'type', 'quoteSource', 'theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--quote'].figma,
		}
	},
} as Meta;

export const Quote = StoryTemplates.Quote;


Quote.args = {
	...StoryTemplates.Quote.args,
	type: 'pull',
	quoteSource: '',
};
