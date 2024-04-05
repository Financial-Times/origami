import type {Meta} from '@storybook/react';

import {Link, Body} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-typography',
	component: Link,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
	argTypes: {
		theme: {
			options: ['standard', 'inverse', 'professional'],
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
