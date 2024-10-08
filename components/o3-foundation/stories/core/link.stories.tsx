import type {Meta} from '@storybook/react';

import {Link, Body} from '../../src/tsx';
import '../../src/css/brands/core.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/o3-foundation/o3-typography/Link',
	component: Link,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['core-o3-typography-link--links'].figma,
		},
	},
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
		openInNewWindow: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const Links = props => {
	return (
		<Body theme={props.theme} brand="core">
			This page links back{' '}
			<Link href="https://origami.ft.com" theme={props.theme} brand="core">
				to Origami
			</Link>
			.
		</Body>
	);
};
