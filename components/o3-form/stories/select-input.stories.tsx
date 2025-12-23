import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {SelectInput as SelectInputTsx} from '../src/tsx/SelectInput';

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';

const meta: Meta<typeof SelectInputTsx> = {
	title: 'o3-form',
	component: SelectInputTsx,
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
					style={{gridColumn: `content-start / content-end`}}>
					<Story />
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

const options = (
	<>
		<option value="American Express">American Express</option>
		<option value="Visa Debit">Visa Debit</option>
		<option value="Visa Credit">Visa Credit</option>
		<option value="Mastercard Debit">Mastercard Debit</option>
		<option value="Mastercard Credit">Mastercard Credit</option>
	</>
);

export const SelectInput = {
	args: {
		label: 'Card type',
		description: 'Printed on the front side of your payment card.',
		feedback: {},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: args => {
		return (
			<SelectInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
				length={args.length}>
				{options}
			</SelectInputTsx>
		);
	},
};

export const SelectInputShortThree = {
	args: {
		label: 'Title',
		description: 'Printed on the front side of your payment card.',
		feedback: {},
		length: 3,
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: args => {
		return (
			<SelectInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
				length={args.length}>
				<option value="Mr">Mr</option>
				<option value="Mrs">Mrs</option>
				<option value="Mx">Mx</option>
			</SelectInputTsx>
		);
	},
};

export const SelectInputShortOne = {
	args: {
		label: 'Initial',
		description: 'Printed on the front side of your payment card.',
		feedback: {},
		length: 1,
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: args => {
		return (
			<SelectInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
				length={args.length}>
				<option value="A">A</option>
				<option value="B">B</option>
				<option value="C">C</option>
				<option value="M">M</option>
			</SelectInputTsx>
		);
	},
};

export const SelectInputDisabled = {
	args: {
		label: 'Card type',
		description: 'Printed on the front side of your payment card.',
		disabled: true,
		feedback: {},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: args => {
		return (
			<SelectInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}>
				{options}
			</SelectInputTsx>
		);
	},
};

export const SelectInputErrorState = {
	args: {
		label: 'Card type',
		description: 'Printed on the front side of your payment card.',
		feedback: {message: 'Something went wrong', type: 'error'},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input-error-state'].figma,
		},
	},
	render: args => {
		return (
			<SelectInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				length={args.length}
				feedback={args.feedback}>
				{options}
			</SelectInputTsx>
		);
	},
};

export default meta;
