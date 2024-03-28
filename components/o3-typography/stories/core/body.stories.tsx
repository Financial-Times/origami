import type {Meta} from '@storybook/react';
import {Body, Link} from '../../src/tsx';

import '../../src/css/brands/core.css';
import {Emphasis, Strong, Subscript, Superscript} from '../../src/tsx/body';

export default {
	title: 'Core/o3-typography',
	component: Body,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
		style: {
			options: ['regular', 'italic'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

export const BodyStory = {
	render: args => {
		return (
			<>
				<Body theme={args.theme} style={args.style}>
					Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					<Link href="#" theme={args.theme}>
						Link
					</Link>{' '}
					a rem
					<Strong>excepturi</Strong> consequuntur commodi dolores ad{' '}
					<Emphasis>laboriosam</Emphasis> qui odit ipsum distinctio quos laborum
					dolore magnam iure rerum, enim deleniti saepe sunt.
				</Body>
				<Body theme={args.theme} style={args.style}>
					Lorem ipsum dolor sit amet<Superscript>Sup</Superscript>, consectetur
					adipisicing elit
					<Subscript>Sub</Subscript>.
					<Link href="#">Link Necessitatibus asperiores</Link>
				</Body>
			</>
		);
	},
};
