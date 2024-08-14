import type {Meta} from '@storybook/react';
import {TextInput as TextInputTsx} from '../../src/tsx/TextInput';
import '../../src/css/brands/whitelabel.css';

const meta: Meta<typeof TextInputTsx> = {
	title: 'Whitelabel/o3-form',
	component: TextInputTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
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
	render: (args) => {
		return (
			<TextInputTsx label={args.label} disabled={args.disabled} description={args.description} feedback={args.feedback}
										labelId="label" />);
	},
};

export const TextInputErrorState = {
	args: {
		label: 'Full name',
		description: 'Your full name as printed on your driving license',
		feedback: {message: 'Something went wrong', type: 'error'},
	},
	render: (args) => {
		return (
			<TextInputTsx label={args.label} disabled={args.disabled} description={args.description} length={args.length} feedback={args.feedback}
										labelId="label" />);
	},
};

export const ShortTextInput = {
	args: {
		label: 'Security code',
		description:
			'3 digit security code as printed on the back of your credit card.',
		length:
			3,
	},
	render: (args) => {
		return (<TextInputTsx label={args.label} disabled={args.disabled} description={args.description} feedback={args.feedback} length={args.length} labelId="label"/>)
	}
};

export default meta;
