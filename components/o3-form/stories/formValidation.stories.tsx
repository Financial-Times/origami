import type {Meta} from '@storybook/react';
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
		return <FormValidationHtml/>;
	},
	play: async ({canvasElement}) => {
		const form = canvasElement.querySelector(
			'#demo-form'
		) as HTMLFormElement | null;

		if (form) {
			initO3FormValidation(form);
		}

		form?.addEventListener('submit', (event) => {
			event.preventDefault();
		});
	},
};

export default meta;
