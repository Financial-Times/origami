import type {Meta} from '@storybook/react';
import {Body, Link} from '../../src/tsx';

import '../../main.css';

import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: Body,
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
			options: ['standard', 'inverse'],
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
				<Body theme={args.theme}>
					Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					<Link href="#" theme={args.theme}>
						Link
					</Link>{' '}
					a rem
					<strong className="o-typography-bold">excepturi</strong> consequuntur
					commodi dolores ad <em className="o-typography-italic">laboriosam</em>{' '}
					qui odit ipsum distinctio quos laborum dolore magnam iure rerum, enim
					deleniti saepe sunt.
				</Body>
				<Body theme={args.theme}>
					Lorem ipsum dolor sit amet<sup class="o-typography-sup">Sup</sup>,
					consectetur adipisicing elit<sub class="o-typography-sub">Sub</sub>.
					<Link href="#">Link Necessitatibus asperiores</Link>
				</Body>
			</>
		);
	},
};
