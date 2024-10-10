import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {TextInput as TextInputTsx} from '../../src/tsx/TextInput';
import '../../src/css/brands/whitelabel.css';

const meta: Meta<typeof TextInputTsx> = {
	title: 'Sustainable Views/o3-form',
	component: TextInputTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel" className="o3-grid">
				<div style={{gridColumn: `content-start / content-end`}}>
					<Story />
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const TextInput = {
	args: {
		label: 'Full name',
		description: 'Your full name as printed on your driving license',
		feedback: {},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: (args) => {
		return (
			<TextInputTsx label={args.label} disabled={args.disabled} description={args.description} feedback={args.feedback}
										/>);
	},
};

export const TextInputErrorState = {
	args: {
		label: 'Full name',
		description: 'Your full name as printed on your driving license',
		feedback: {message: 'Something went wrong', type: 'error'},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input-error-state'].figma,
		},
	},
	render: (args) => {
		return (
			<TextInputTsx label={args.label} disabled={args.disabled} description={args.description} length={args.length}
										feedback={args.feedback}
			/>);
	},
};

export const ShortTextInput = (args) => {
	return (
		<>
			<TextInputTsx label="Day" description="Two digit day of the month" feedback={args.feedback} length={2}
			/>
			<TextInputTsx label="Security code"
										description="3 digit security code as printed on the back of your credit card."
										feedback={args.feedback} length={3} />
			<TextInputTsx label="Date of Bith" description="The year you were born" feedback={args.feedback} length={4}
			/>
			<TextInputTsx label="Passcode" description="A 5-digin code to authenticate you on login"
										feedback={args.feedback} length={5} />
		</>
	);
};
ShortTextInput.parameters = {
	controls: {
		disable: true,
	},
	design: {
		type: 'figma',
		url: links['whitelabel-o3-form--text-input'].figma,
	},
};

export default meta;
