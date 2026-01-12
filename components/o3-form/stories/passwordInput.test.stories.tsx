import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {expect} from '@storybook/test';

import {PasswordInput as PasswordInputTsx} from '../src/tsx/PasswordInput';
import '../src/css/brands/core.css';
import userEvent from '@testing-library/user-event';

const meta: Meta<typeof PasswordInputTsx> = {
	title: 'tests/o3-form',
	component: PasswordInputTsx,
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
						fontFamily: 'var(--o3-font-family-metric',
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

export const PasswordInputTest = {
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
	play: async ({canvas, userElement}) => {
		const passwordInput = canvas.getByTestId('o3-password-input');
		const toggleButton = canvas.getByTestId('o3-password-input-toggle');

		await userEvent.type(passwordInput, 'MySecretPassword');
		await expect(passwordInput.getAttribute('type')).toBe('password');
		await expect(toggleButton.getAttribute('title')).toBe('Show password');
		await expect(toggleButton.getAttribute('aria-label')).toBe('Show password');

		toggleButton.click();

		await expect(passwordInput.getAttribute('type')).toBe('text');
		await expect(toggleButton.getAttribute('title')).toBe('Hide password');
		await expect(toggleButton.getAttribute('aria-label')).toBe('Hide password');
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
export default meta;
