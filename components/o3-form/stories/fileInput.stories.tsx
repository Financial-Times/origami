import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';

import {FileInput as FileInputTsx} from '../src/tsx/FileInput';
import {FileInputJavaScript, fileInputJavaScriptSetup} from "./FileInputJavaScript";

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
				isUploading={args.isUploading}
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
				isUploading={args.isUploading}
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
	play: async ({canvasElement}: {canvasElement: HTMLCanvasElement}) => {
		fileInputJavaScriptSetup(canvasElement);

		if (fileUploadElement) {
			new FileUploadController(fileUploadElement)
		}
	},
	render: args => {
		return <FileInputJavaScript/>;
	}
}

export default meta;
