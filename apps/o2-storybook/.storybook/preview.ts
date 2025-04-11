import type {Preview} from "@storybook/react"
import {addons} from "@storybook/preview-api"
import {
	UPDATE_GLOBALS,
	STORY_ARGS_UPDATED,
	STORY_CHANGED,
} from "@storybook/core-events"

const preview: Preview = {
	parameters: {
		html: {
			highlighter: {
				showLineNumbers: true,
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
		actions: {argTypesRegex: '^on[A-Z].*'},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview

let channel = addons.getChannel()

const storyArgsListener = args => {
	const colorTheme = args.args.theme
	const slateBackground = colorTheme === 'inverse' || colorTheme === 'professional-inverse' || colorTheme === 'ft-live'
		channel.emit(UPDATE_GLOBALS, {
			globals: {
				backgrounds: slateBackground
					? {name: 'slate', value: '#262a33ff'}
					: undefined,
			},
		});
}

const storyChangedListener = () => {
	channel.emit(UPDATE_GLOBALS, {
		globals: {
			backgrounds: undefined,
		},
	})
}

function setupBackgroundListener() {
	channel.removeListener(STORY_ARGS_UPDATED, storyArgsListener)
	channel.removeListener(STORY_CHANGED, storyChangedListener)
	channel.addListener(STORY_ARGS_UPDATED, storyArgsListener)
	channel.addListener(STORY_CHANGED, storyChangedListener)
}

setupBackgroundListener()
