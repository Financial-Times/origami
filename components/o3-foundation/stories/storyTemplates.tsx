import type {Meta} from '@storybook/react';
import {transformCode} from './utils';
import {O3Grid} from './grid';
import './grid-sb-styles.css';

export function GridMetaGenerator(brand: string): Meta {
	return {
		component: O3Grid,
		decorators: [
			Story => (
				<div data-o3-brand={brand}>
					<Story />
				</div>
			),
		],
		parameters: {
			layout: 'fullscreen',
			backgrounds: {default: 'paper'},
			html: {
				transform: (code: string) => transformCode(code),
			},
		},
	};
}
