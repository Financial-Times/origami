import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {DateInput as DateInputTsx} from '../src/tsx/DateInput';
import '../src/css/brands/core.css';

const meta: Meta<typeof DateInputTsx> = {
	title: 'o3-form',
	component: DateInputTsx,
	tags: [
		'experimental',
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

export const DateInput = {
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
			<DateInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
			/>
		);
	},
};

export const DateInputErrorState = {
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
			<DateInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
			/>
		);
	},
};

export default meta;
