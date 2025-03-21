import {useGlobals} from '@storybook/manager-api';
import {contrast} from 'chroma-js';

export const withOrigamiBackground = (Story, context) => {
	let css = '';
	let [{origamiBackground}] = useGlobals();
	origamiBackground =
		origamiBackground ||
		context.parameters.origamiBackground ||
		'page-background';

	const origamiBackgroundHex = getComputedStyle(document.body)
		.getPropertyValue(`--o-colors-${origamiBackground}`)
		.trim();

	const foreground =
		contrast(origamiBackgroundHex, 'black') >= 4.5 ? 'black' : 'white';
	css = `
      body {
        background: var(--o-colors-${origamiBackground});
        color: ${foreground};
      }`;

	return (
		<>
			<style>{css}</style>
			<Story />
		</>
	);
};
