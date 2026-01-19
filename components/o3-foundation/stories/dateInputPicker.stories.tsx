import links from '@financial-times/o3-figma-sb-links';
import type {Meta} from '@storybook/react';

import '../src/css/brands/core.css';
import {DateInputPicker as DateInputPickerTsx} from '../src/tsx/components/input/DateInputPicker';

const meta: Meta<typeof DateInputPickerTsx> = {
	title: 'o3-foundation/o3-input/date',
	component: DateInputPickerTsx,
	tags: [
		'new',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		(Story, {args, globals}) => (
			<div data-o3-brand={globals.selectedBrand || 'whitelabel'}>
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
