import type {Preview} from '@storybook/react';
import {addons} from '@storybook/preview-api';
import {
	UPDATE_GLOBALS,
	STORY_ARGS_UPDATED,
	STORY_CHANGED,
} from '@storybook/core-events';

import {allModes} from '../modes';

const preview: Preview = {
	parameters: {
		viewport: {
		      viewports: {
		        "360px": { name: "Small", styles: { width: "360px", height: "900px" } },
		        "1200px": { name: "XLarge", styles: { width: "1200px", height: "900px" } },
		      },
		},
		chromatic: {
			modes: {
				mobile: allModes["360px"],
				desktop: allModes["1200px"],
			},
		},
		html: {
			prettier: {
				tabWidth: 2,
				useTabs: false,
				htmlWhitespaceSensitivity: 'strict',
			},
		},
		backgrounds: {
			values: [
				{
					name: 'paper',
					value: '#fff1e5ff',
				},
				{
					name: 'slate',
					value: '#262a33ff',
				},
				{
					name: 'wheat',
					value: '#f2dfceff',
				},
				{
					name: 'white',
					value: '#ffffff',
				},
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;

let channel = addons.getChannel();

const storyArgsListener = args => {
	if (args.args.theme === 'inverse') {
		let colorTheme = args.args.theme;
		channel.emit(UPDATE_GLOBALS, {
			globals: {
				theme: colorTheme,
				backgrounds: {name: 'slate', value: '#262a33ff'},
			},
		});
	} else {
		let colorTheme = args.args.theme;
		channel.emit(UPDATE_GLOBALS, {
			globals: {
				theme: colorTheme,
				backgrounds: {name: 'paper', value: '#fff1e5ff'},
			},
		});
	}
};

const storyChangedListener = () => {
	channel.emit(UPDATE_GLOBALS, {
		globals: {
			backgrounds: undefined,
		},
	});
};

function setupBackgroundListener() {
	channel.removeListener(STORY_ARGS_UPDATED, storyArgsListener);
	channel.removeListener(STORY_CHANGED, storyChangedListener);
	channel.addListener(STORY_ARGS_UPDATED, storyArgsListener);
	channel.addListener(STORY_CHANGED, storyChangedListener);
}

setupBackgroundListener();
