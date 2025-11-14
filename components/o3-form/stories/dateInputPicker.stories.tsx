import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {DateInputPicker as DateInputPickerTsx} from '../src/tsx/DateInputPicker';
import '../src/css/brands/core.css';

const meta: Meta<typeof DateInputPickerTsx> = {
	title: 'o3-form',
	component: DateInputPickerTsx,
	tags: [
		'experimental',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		Story => (
			<div data-o3-brand="core" className="o3-grid">
				<div
					className="o3-form"
					style={{
						gridColumn: `content-start / content-end`,
						fontFamily: 'var(--o3-font-family-metric)',
					}}>
					<Story />
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const DateInputPicker = {
	args: {
		label: 'Date of Birth',
		description: 'The date you were born',
		feedback: {},
		disabled: false,
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['o3-form--date-input'].figma,
		},
	},
	render: args => {
		return (
			<DateInputPickerTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
			/>
		);
	},
};

export const DateInputPickerErrorState = {
	args: {
		label: 'Date of Birth',
		description: 'The date you were born',
		feedback: {
			message: 'Date must be in DD / MM / YYYY format',
			type: 'error',
		},
		disabled: false,
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['o3-form--date-input-error-state'].figma,
		},
	},
	render: args => {
		return (
			<DateInputPickerTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				length={args.length}
				feedback={args.feedback}
			/>
		);
	},
};

export default meta;
