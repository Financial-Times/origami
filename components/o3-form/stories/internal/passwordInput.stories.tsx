import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {PasswordInput as PasswordInputTsx} from '../../src/tsx/PasswordInput';
import '../../src/css/brands/whitelabel.css';
import {Form} from '../../src/tsx';

const meta: Meta<typeof PasswordInputTsx> = {
	title: 'Internal/o3-form',
	component: PasswordInputTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel" className="o3-grid">
				<div style={{gridColumn: `content-start / content-end`, fontFamily: 'var(--o3-font-family-metric'}}>
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
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--password-input'].figma,
		},
	},
	render: (args) => {
		return (
			<Form>
				<PasswordInputTsx label={args.label} disabled={args.disabled} description={args.description}
													feedback={args.feedback}
				/>
			</Form>);
	},
};

export const PasswordInputErrorState = {
	args: {
		label: 'Password',
		description: 'Your password must be at least 8 characters',
		feedback: {message: 'Password must be at least 8 characters', type: 'error'},
		disabled: false,
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--password-input-error-state'].figma,
		},
	},
	render: (args) => {
		return (
			<Form>
				<PasswordInputTsx label={args.label} disabled={args.disabled} description={args.description}
													length={args.length}
													feedback={args.feedback}
				/>
			</Form>);
	},
};


export default meta;
