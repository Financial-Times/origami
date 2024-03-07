import type {Meta} from '@storybook/react';

import '../../main.css';

import '../../src/css/brands/core.css';
import {Link} from '../../src/tsx';

export default {
	title: 'Core/o3-typography',
	component: Link,
	decorators: [
		Story => (
			<div className="o3-brand-core">
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
	},
} as Meta;

export const Links = props => {
	return (
		<p>
			This page links back{' '}
			<Link href="https://origami.ft.com" theme={props.theme}>
				to Origami
			</Link>
			.
		</p>
	);
};
