import type {Meta} from '@storybook/react';

export const TemplateSBConfig: Meta = {
	parameters: {
		html: {
			root: '#component-wrapper',
			transform: (code: string) => transformCode(code),
		}
	},
};

const transformCode = (code: string) => {
	// replace style and data-popper-placement attribute from o3-tooltip-* tags
	const styleRegex = /style="[^"]*"/g;
	const placementRegex = /data-popper-placement="[^"]*"/g;

	let contentRegex =
		/(?<=<o3-tooltip-onboarding[^>]*>)([\s\S]*?)(?=<\/o3-tooltip-onboarding>)/g;

	if (code.includes('o3-tooltip-toggle')) {
		contentRegex =
			/(?<=<o3-tooltip-toggle[^>]*>)([\s\S]*?)(?=<\/o3-tooltip-toggle[^>]*>)/g;
	}

	code = code.replace(styleRegex, '');
	code = code.replace(placementRegex, '');
	code = code.replace(contentRegex, '');

	return code;
};
