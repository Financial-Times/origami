import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {Form as FormTsx} from '../src/tsx';

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';
import { initO3FormValidation} from "../src/js/validation";

const meta: Meta<typeof FormTsx> = {
	title: 'o3-form',
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
		return (
			// Use HTML instead of TSX to replicate a real-world use case of validation.js
			<form id="demo-form" className='demo-form'>
				<div className="o3-form-field">
					<label
						className="o3-form-field__label"
						htmlFor="o3-form-text-input-_9004070302523871"
					>
						First name
					</label>
					<span
						className="o3-form-input__description"
						id="o3-form-description_41273237907367455"
					>
          				The name you are referred to by
        			</span>
					<input
						id="o3-form-text-input-_9004070302523871"
						className="o3-form o3-form-text-input"
						required
						aria-required="true"
						type="text"
					/>
				</div>
				<div className="o3-form-field">
					<label
						className="o3-form-field__label"
						htmlFor="o3-form-text-input-_3017971228893219"
					>
						Last name
					</label>
					<span
						className="o3-form-input__description"
						id="o3-form-description_9230638484727663"
					>
          				Your family name
        			</span>
					<input
						id="o3-form-text-input-_3017971228893219"
						className="o3-form o3-form-text-input"
						required
						aria-required="true"
						type="text"
					/>
				</div>
				<div className="o3-form-field">
					<label
						className="o3-form-field__label"
						htmlFor="o3-form-text-input-_9285747170073946"
					>
						CVV code
					</label>
					<span
						className="o3-form-input__description"
						id="o3-form-description_03257263157199375"
					>
          				We're definitely not stealing your data
        			</span>
					<input
						id="o3-form-text-input-_9285747170073946"
						className="o3-form o3-form-text-input"
						required
						aria-required="true"
						type="text"
					/>
				</div>
				<button className="o3-button o3-button--primary" type="submit">Submit</button>
			</form>
		);
	},
	play: async ({ canvasElement }) => {
		const form = canvasElement.querySelector(
			'#demo-form'
		) as HTMLFormElement | null;

		console.log('[play] form from canvasElement:', form);

		form.addEventListener('submit', e => console.log('[basic] submit fired', e));
		if (form) {
			initO3FormValidation(form);
		}
	},
};

export default meta;
