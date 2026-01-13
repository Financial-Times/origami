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

export const FormValidationDisplaysElementErrorSummary = {
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

		// When clicking through the form.
		await userEvent.click(firstInputElement);
		await userEvent.click(secondInputElement);
		await userEvent.click(thirdInputElement);

		// It should highlight the first input field as invalid
		expect(firstInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(firstInputElement.classList).toContain('o3-form-text-input--error');

		// It should highlight the second input field as invalid
		expect(secondInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(secondInputElement.classList).toContain('o3-form-text-input--error');

		// It should not highlight the third input field as invalid
		expect(thirdInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).not.toBeInTheDocument();
		expect(thirdInputElement.classList).not.toContain('o3-form-text-input--error');

		// When correcting an error
		await userEvent.click(firstInputElement);
		await userEvent.type(firstInputElement, 'My resolving text');

		// It should not highlight the first input field as invalid
		expect(firstInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).not.toBeInTheDocument();
		expect(firstInputElement.classList).not.toContain('o3-form-text-input--error');
	},
};

export const FormValidationDisplaysErrorSummary = {
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
			form.addEventListener('submit', (event) => {
				event.preventDefault();
			});
			initO3FormValidation(form);
		} else {
			return false;
		}

		// When submitting an empty form
		const submitButton = canvas.getByTestId('submit-button');
		await userEvent.click(submitButton);

		const errorSummary = canvasElement.querySelector('.o3-form__error-summary');
		// It should render an error summary
		expect(errorSummary).toBeInTheDocument();


		// It should list all erroring fields with a reason
		const summaryWithin = within(errorSummary);

		await summaryWithin.findByText(getErrorSummaryLineItemText('First name'));
		await summaryWithin.findByText(getErrorSummaryLineItemText('Last name'));
		await summaryWithin.findByText(getErrorSummaryLineItemText('CVV code'));

		const firstInput = within(canvas.getByTestId('first-input'));
		const firstInputElement = firstInput.getByRole('textbox');

		const secondInput = within(canvas.getByTestId('second-input'));
		const secondInputElement = secondInput.getByRole('textbox');

		const thirdInput = within(canvas.getByTestId('third-input'));
		const thirdInputElement = thirdInput.getByRole('textbox');

		// It should highlight the first input field as invalid
		expect(firstInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(firstInputElement.classList).toContain('o3-form-text-input--error');

		// It should highlight the second input field as invalid
		expect(secondInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(secondInputElement.classList).toContain('o3-form-text-input--error');

		// It should not highlight the third input field as invalid
		expect(thirdInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(thirdInputElement.classList).toContain('o3-form-text-input--error');

		// When resolving one field
		await userEvent.type(firstInputElement, 'My resolving text');
		await userEvent.click(submitButton);

		// It should list only erroring fields with a reason
		expect(canvas.queryByText(getErrorSummaryLineItemText('First name'))).not.toBeInTheDocument();
		expect(canvas.queryByText(getErrorSummaryLineItemText('Last name'))).toBeInTheDocument();
		expect(canvas.queryByText(getErrorSummaryLineItemText('CVV code'))).toBeInTheDocument();

		// It should not highlight the first input field as invalid
		expect(firstInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).not.toBeInTheDocument();
		expect(firstInputElement.classList).not.toContain('o3-form-text-input--error');

		// It should highlight the second input field as invalid
		expect(secondInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(secondInputElement.classList).toContain('o3-form-text-input--error');

		// It should not highlight the third input field as invalid
		expect(thirdInput.queryByText(getInlineErrorText(), {selector: ".o3-form-feedback__error-message"})).toBeInTheDocument();
		expect(thirdInputElement.classList).toContain('o3-form-text-input--error');

		// When resolving all other fields.
		await userEvent.type(secondInputElement, 'My resolving text');
		await userEvent.type(thirdInputElement, 'My resolving text');
		await userEvent.click(submitButton);

		// It should not display the error summary
		expect(canvasElement.querySelector('.o3-form__error-summary')).not.toBeInTheDocument();
	},
};

const getErrorSummaryLineItemText = (expectedText: string) => (_: string, element: HTMLElement) => {
	return element.textContent === `${expectedText}: Please fill out this field.` || element.textContent === `${expectedText}: Please fill in this field.`;
}

const getInlineErrorText = () => (_: string, element: HTMLElement) => {
	return element.textContent === `Please fill out this field.` || element.textContent === `Please fill in this field.`;
}

export default meta;
