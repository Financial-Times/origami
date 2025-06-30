import type {Meta} from '@storybook/react-webpack5';
import links from "@financial-times/o3-figma-sb-links"
import {CheckBoxGroup as CheckBoxGroupTsx} from '../../src/tsx/index';
import '../../src/css/brands/sustainable-views.css';
import {CheckBoxGroupStory} from '../story-template';

export default {
	title: 'Sustainable Views/o3-form',
	component: CheckBoxGroupTsx,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
		design: {
			type: 'figma',
			url: links["whitelabel-o3-form--check-box-group"].figma
		}
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
