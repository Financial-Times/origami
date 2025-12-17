import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {expect, userEvent, waitFor} from '@storybook/test';

import {FileInput as FileInputTsx} from '../src/tsx/FileInput';
import {FileInputJavaScript, fileInputJavaScriptSetup} from "./FileInputJavaScript";

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
import {within} from "@testing-library/dom";


const meta: Meta<typeof FileInputTsx> = {
	title: 'Tests/o3-form',
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
		(Story, {globals}) => (
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

export const FileInputJavascriptDeleteButton = {
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
	play: async ({canvasElement}: { canvasElement: HTMLCanvasElement }) => {
		fileInputJavaScriptSetup(canvasElement);

		const canvas = within(canvasElement);
		const fileInputElement = canvas.getByTestId<HTMLInputElement>('file-input');
		const fileNameElement = canvas.getByTestId('file-input-label');
		const getDeleteButton = () => canvas.queryByRole('button');

		expect(fileNameElement).toHaveTextContent('No file chosen');
		expect(fileInputElement?.value).toEqual('');

		await waitFor(() => {
			const deleteButton = getDeleteButton();
			console.log(deleteButton);
			expect(deleteButton).not.toBeInTheDocument();
		});

		/* Less than ideal situation here. Ideally we would like to click the label element to trigger the file upload.
		*  This isn't possible with testingLibrary. So we have to "fake" and change the value in the input itself.
		* */
		const file = new File(['my very important scoop for the FT'], 'scoop.txt', {type: 'text/plain'});

		if (fileInputElement) {
			await userEvent.upload(fileInputElement, file);
		}

		expect(fileNameElement).toHaveTextContent('scoop.txt');
		expect(fileNameElement.tagName).toBe('SPAN');
		expect(fileNameElement.tagName).not.toBe('INPUT');
		expect(fileInputElement.value).toEqual('C:\\fakepath\\scoop.txt');


		await waitFor(() => {
			expect(getDeleteButton()).toBeInTheDocument();
		});

		const deleteButton = getDeleteButton();
		if (deleteButton) {
			await userEvent.click(deleteButton);
		} else  {
			throw new Error('Delete button was not found when attempting to click.')
		}

		expect(getDeleteButton()).not.toBeInTheDocument();
		expect(fileInputElement.value).toEqual('');
	},
	render: _ => {
		return <FileInputJavaScript/>;
	}
}

export const FileInputJavascriptUploadDisplay = {
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
	play: async ({canvasElement}: { canvasElement: HTMLCanvasElement }) => {
		fileInputJavaScriptSetup(canvasElement);

		const canvas = within(canvasElement);
		const fileInputElement = canvas.getByTestId('file-input');
		const getUploadText = () => canvas.queryByText('Uploading');

		await waitFor(() => {
			expect(getUploadText()).not.toBeInTheDocument();
		});


		//Act: Simulate uploading event
		fileInputElement.dispatchEvent(new Event('o3Form.uploading.start'));

		//Assert: uploading text visible
		await waitFor(() => {
			expect(getUploadText()).toBeInTheDocument();
		})
		//Act: Simulate uploading complete event
		fileInputElement.dispatchEvent(new Event('o3Form.uploading.complete'));
		//Assert: uploading text disappears
		await waitFor(() => {
			expect(getUploadText()).not.toBeInTheDocument();
		})
	},
	render: args => {
		return <FileInputJavaScript/>;
	}
}

export default meta;
