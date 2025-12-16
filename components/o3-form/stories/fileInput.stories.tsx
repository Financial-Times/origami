import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {FileInput as FileInputTsx} from '../src/tsx/FileUploadController.ts';
import {FileUploadController} from "../src/tsx/FileUploadController";

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';
import '@financial-times/o3-button/css/core.css'
import '@financial-times/o3-button/css/internal.css'
import '@financial-times/o3-button/css/whitelabel.css'
import '@financial-times/o3-button/css/sustainable-views.css'
import '@financial-times/o3-button/css/professional.css'

const meta: Meta<typeof FileInputTsx> = {
	title: 'o3-form',
	component: FileInputTsx,
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
					<Story/>
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const FileInput = {
	args: {
		label: 'Driving license',
		description: 'The front face of your driving license',
		feedback: {},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['o3-form--file-input'].figma,
		},
	},
	render: args => {
		return (
			<FileInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				feedback={args.feedback}
				attributes={{accept: 'image/png,image/jpeg,image/svg+xml'}}
				status={args.status}
			/>
		);
	},
};

export const FileInputErrorState = {
	args: {
		label: 'Driving license',
		description: 'The front face of your driving license',
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
			<FileInputTsx
				label={args.label}
				disabled={args.disabled}
				description={args.description}
				length={args.length}
				feedback={args.feedback}
			/>
		);
	},
};

export const FileInputJavascript = {
	args: {
		label: 'Driving license',
		description: 'The front face of your driving license',
		feedback: {},
	},
	parameters: {
		design: {
			type: 'figma',
			url: links['o3-form--file-input'].figma,
		},
	},
	play: async ({canvasElement}) => {
		const fileUploadElement = canvasElement.querySelector(
			'#file-input'
		) as HTMLInputElement | null;

		fileUploadElement.addEventListener('change', async (event) => {
			console.log('change fired')
		})

		if (fileUploadElement) {
			new FileUploadController(fileUploadElement)
		}
	},
	render: args => {
		return (
			<div className="o3-form-field">
				<label
					className="o3-form-field__label"
					htmlFor="o3-form-file-input-_029271636737572715"
				>
					Driving license
				</label>
				<span
					className="o3-form-input__description"
					id="o3-form-description_7011586203746484"
				>
        			The front face of your driving license
      			</span>
				<div className="o3-form-file-input" id="file-input-container">
					<label
						htmlFor="file-input"
						className="o3-form-field-input__label"
					>
						<span className="o3-form-field-input__label__button o3-button o3-button--primary o3-button-icon o3-button-icon--upload">File Upload</span>
						<span className="o3-form-field-input__label__text">No file chosen</span>
					</label>
					<input
						id="file-input"
						className="o3-form-file-input__input-field"
						required
						aria-required="true"
						type="file"
					/>
				</div>
			</div>
		);
	}
}

export default meta;
