import React, {useMemo} from 'react';
import {useAddonState, useChannel, useParameter} from '@storybook/api';
import {AddonPanel} from '@storybook/components';
import {ADDON_ID, EVENTS, PARAM_KEY} from './constants';
import {PanelContent} from './components/PanelContent';
import {format as prettierFormat} from 'prettier/standalone';
import prettierHtml from 'prettier/parser-html';

const demoUrl = '__origami/service/build/v3/demo';
export const Panel = props => {
	// https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
	const [{code}, setState] = useAddonState(ADDON_ID, {
		code: null,
		options: {},
	}); // https://storybook.js.org/docs/react/addons/addons-api#usechannel

	useChannel({
		[EVENTS.CODE_UPDATE]: async ({code}) => {
			const parser = new DOMParser();
			const codeDoc = parser.parseFromString(code, 'text/html');

			const foundIframe = codeDoc.getElementsByTagName('iframe');

			if (
				foundIframe.length === 1 &&
				foundIframe.item(0).src.includes(demoUrl)
			) {
				console.log(foundIframe.item(0).src);
				const demoEndpoint = parser.parseFromString(
					foundIframe.item(0).src,
					'text/html'
				).textContent;
				try {
					const demoEndpoint = foundIframe
						.item(0)
						.src.replace('/demo', '/demo/html');
					const html = await fetch(demoEndpoint);

					if (html.status !== 200) {
						throw new Error(`${html.status}: ${html.text()}`);
					}
					const json = await html.text();
					code = json;
				} catch (e) {
					const msg = `Failed to load load Iframe story from source:\n${e}\n\n
															Please contact the team for support:\n\norigami.support@ft.com\n#origami-support`;

					console.error(msg);
					code = msg;
				}
			}
			setState(state => ({...state, code}));
		},
	});

	const parameters = useParameter(PARAM_KEY, {});
	const {
		highlighter: {showLineNumbers = false, wrapLines = true} = {},
		prettier = {},
	} = parameters;

	const prettierConfig = {
		htmlWhitespaceSensitivity: 'ignore',
		...prettier,
		// Ensure we always pick the html parser
		parser: 'html',
		plugins: [prettierHtml],
	};

	const formattedCode = useMemo(
		() => code && prettierFormat(code, prettierConfig),
		[code, prettierConfig]
	);

	return (
		<AddonPanel {...props}>
			<PanelContent
				code={formattedCode}
				showLineNumbers={showLineNumbers}
				wrapLines={wrapLines}
			/>
		</AddonPanel>
	);
};
