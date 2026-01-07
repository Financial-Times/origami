import type {Meta} from '@storybook/react';
import {expect, userEvent, within} from '@storybook/test';
import links from '@financial-times/o3-figma-sb-links';

import {Form as FormTsx} from '../src/tsx';

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';
import {initO3FormValidation} from "../src/js/validation";
import {FormValidationHtml} from "./FormValidationHtml";

const meta: Meta<typeof FormTsx> = {
	title: 'Tests/o3-form',
	component: FormTsx,
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
					style={{gridColumn: `content-start / content-end`}}>
					<Story/>
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const FormValidation = {
	parameters: {
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--text-input'].figma,
		},
	},
	render: args => {
		return <FormValidationHtml/>;
	},
	play: async ({canvasElement}) => {
		const canvas = within(canvasElement);
		const form = canvasElement.querySelector(
			'#demo-form'
		) as HTMLFormElement | null;

		if (form) {
			initO3FormValidation(form);
		}

		const firstInput = within(canvas.getByTestId('first-input'));
		const firstInputElement = firstInput.getByRole('textbox');

		const secondInput = within(canvas.getByTestId('second-input'));
		const secondInputElement = secondInput.getByRole('textbox');

		const thirdInput = within(canvas.getByTestId('third-input'));
		const thirdInputElement = thirdInput.getByRole('textbox');

		// Whenn clicking through the form.
		await userEvent.click(firstInputElement);
		await userEvent.click(secondInputElement);
		await userEvent.click(thirdInputElement);

		// It should highlight the first input field as invalid
		expect(firstInput.queryByText('Please fill in this field.')).toBeInTheDocument();
		expect(firstInputElement.classList).toContain('o3-form-text-input--error');

		// It should highlight the second input field as invalid
		expect(secondInput.queryByText('Please fill in this field.')).toBeInTheDocument();
		expect(secondInputElement.classList).toContain('o3-form-text-input--error');

		// It should not highlight the third input field as invalid
		expect(thirdInput.queryByText('Please fill in this field.')).not.toBeInTheDocument();
		expect(thirdInputElement.classList).not.toContain('o3-form-text-input--error');

		// When correcting an error
		await userEvent.click(firstInputElement);
		await userEvent.type(firstInputElement, 'My resolving text');

		// It should not highlight the first input field as invalid
		expect(firstInput.queryByText('Please fill in this field.')).not.toBeInTheDocument();
		expect(firstInputElement.classList).not.toContain('o3-form-text-input--error');
	},
};

export default meta;
