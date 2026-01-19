import links from '@financial-times/o3-figma-sb-links';
import type {Meta} from '@storybook/react';

import '../src/css/brands/core.css';
import {PasswordInput as PasswordInputTsx} from '../src/tsx/components/input/PasswordInput';

const meta: Meta<typeof PasswordInputTsx> = {
	title: 'o3-foundation/o3-input/password',
	component: PasswordInputTsx,
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

export const PasswordInput = {
	args: {
		label: 'Password',
		description: 'Your password must be at least 8 characters.',
		feedback: {},
		disabled: false,
		forgotPasswordLink: '#',
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--password-input'].figma,
		},
	},
	render: args => {
		return (
			<PasswordInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
				forgotPasswordLink={args.forgotPasswordLink}
			/>
		);
	},
};

export const PasswordInputErrorState = {
	args: {
		label: 'Password',
		description: 'Your password must be at least 8 characters',
		feedback: {
			message: 'Password must be at least 8 characters',
			type: 'error',
		},
		disabled: false,
		forgotPasswordLink: '#',
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--password-input-error-state'].figma,
		},
	},
	render: args => {
		return (
			<PasswordInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				length={args.length}
				feedback={args.feedback}
				forgotPasswordLink={args.forgotPasswordLink}
			/>
		);
	},
};

export default meta;
