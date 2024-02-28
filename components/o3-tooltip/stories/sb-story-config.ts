import type {Meta} from '@storybook/react';

export const TemplateSBConfig: Meta = {
	parameters: {
		html: {
			transform: (code: string) => transformCode(code),
		},
	},
};

const transformCode = (code: string, regex?: RegExp) => {
	// replace style and data-popper-placement attribute from o3-tooltip-* tags
	const styleRegex = /style="[^"]*"/g;
	const placementRegex = /data-popper-placement="[^"]*"/g;
	// o3-tooltip-onboarding children content
	const contentRegex = regex
		? regex
		: /(?<=<o3-tooltip-onboarding[^>]*>)([\s\S]*?)(?=<\/o3-tooltip-onboarding>)/g;

	// remove div tags with class o3-tooltip-demo-wrapper
	const wrapperRegex = /<div class="o3-tooltip-demo-wrapper">[\s\S]*?<\/div>/g;

	code = code.replace(styleRegex, '');
	code = code.replace(placementRegex, '');
	code = code.replace(contentRegex, '');

	return code;
};

export const transformToggleCode = (code: string) => {
	// o3-tooltip-toggle children content
	const contentRegex =
		/(?<=<o3-tooltip-toggle[^>]*>)([\s\S]*?)(?=<\/o3-tooltip-toggle[^>]*>)/g;
	return transformCode(code, contentRegex);
};
