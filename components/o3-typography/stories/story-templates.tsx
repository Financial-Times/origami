import {Body, Heading, Link, UnorderedList, OrderedList} from '../src/tsx';
import {Emphasis, Strong, Subscript, Superscript} from '../src/tsx/body';
import type {StoryObj} from '@storybook/react';
import {BodyProps} from '@financial-times/o-typography/src/tsx/typography';

const TemplateSBConfig = {
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
	},
};

type BodyStory = Omit<StoryObj, 'args'> & {
	args: BodyProps & {disabled: Boolean};
};

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const BodyStory = {
	...TemplateSBConfig,
	argTypes: {
		...TemplateSBConfig.argTypes,
		style: {
			options: ['regular', 'italic'],
			control: {
				type: 'radio',
			},
		},
	},
	render: args => {
		return (
			<>
				<Body theme={args.theme} style={args.style}>
					Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.{' '}
					<Link href="#" theme={args.theme}>
						Link
					</Link>{' '}
					a rem <Strong theme={args.theme}>excepturi</Strong> consequuntur
					commodi dolores ad <Emphasis theme={args.theme}>laboriosam</Emphasis>{' '}
					qui odit ipsum distinctio quos laborum dolore magnam iure rerum, enim
					deleniti saepe sunt.
				</Body>
				<Body theme={args.theme} style={args.style}>
					Lorem ipsum dolor sit amet
					<Superscript theme={args.theme}>Sup</Superscript>, consectetur
					adipisicing elit
					<Subscript theme={args.theme}>Sub</Subscript>.
					<Link href="#" theme={args.theme}>
						Link Necessitatibus asperiores
					</Link>
				</Body>
			</>
		);
	},
};

const HeadingStory = {
	...TemplateSBConfig,
	argTypes: {
		...TemplateSBConfig.argTypes,
		level: {
			options: ['1', '2', '3', '4', '5', '6'],
			control: {
				type: 'select',
			},
		},
	},
	args: {
		level: '1',
		text: "Don't settle for black and white",
	},
	render: args => (
		<Heading level={args.level} theme={args.theme}>
			{args.text}
		</Heading>
	),
};

const LinkStory = {
	...TemplateSBConfig,
	render: args => {
		return (
			<Body theme={args.theme}>
				This page links back{' '}
				<Link href="https://origami.ft.com" theme={args.theme}>
					to Origami
				</Link>
				.
			</Body>
		);
	},
};

const UnorderedListStory = {
	...TemplateSBConfig,
	render: args => {
		return (
			<UnorderedList>
				<li>Origami means "Folding Paper"</li>
				<li>Origami involves folding paper</li>
				<li>You need paper to do Origami</li>
			</UnorderedList>
		);
	},
};

const OrderedListStory = {
	...TemplateSBConfig,
	render: args => {
		return (
			<OrderedList>
				<li>Fold</li>
				<li>Fold again</li>
				<li>Crane</li>
			</OrderedList>
		);
	},
};

export const BodyTemplate: TemplateType = {
	...BodyStory,
};

export const HeadingTemplate: TemplateType = {
	...HeadingStory,
};

export const LinkTemplate: TemplateType = {
	...LinkStory,
};

export const UnorderedListTemplate: TemplateType = {
	...UnorderedListStory,
};

export const OrderedListTemplate: TemplateType = {
	...OrderedListStory,
};
