import {
	Body,
	Footer,
	Heading,
	Link,
	UnorderedList,
	OrderedList,
	Caption,
	Wrapper
} from '../src/tsx';
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
		size: {
			options: ['regular', 'small'],
			control: {
				type: 'radio',
			},
		},
	},
	render: args => {
		return (
			<>
				<Body theme={args.theme} style={args.style} size={args.size}>
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
			<UnorderedList theme={args.theme}>
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
			<OrderedList theme={args.theme}>
				<li>Fold</li>
				<li>Fold again</li>
				<li>Crane</li>
			</OrderedList>
		);
	},
};

export const CaptionStory = {
	...TemplateSBConfig,
	render: args => {
		return <Caption>Image Source: FT Asset Library</Caption>;
	},
};

export const WrapperStory = {
	...TemplateSBConfig,
	render: args => {
		return (
			<Wrapper theme={args.theme}>
				<h1>Heading level 1</h1>
				<h2>Heading level 2</h2>
				<h3>Heading level 3</h3>
				<h4>Heading level 4</h4>
				<h5>Heading level 5</h5>
				<h6>Heading level 6</h6>

				<p>
					Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.{' '}
					<a href="#">Link</a> a rem <strong>excepturi</strong> consequuntur
					commodi dolores ad <em>laboriosam</em> qui odit ipsum distinctio quos
					laborum dolore magnam iure rerum, enim deleniti saepe sunt.
				</p>
				<p>
					Lorem ipsum dolor sit amet<sup>Sup</sup>, consectetur adipisicing elit
					<sub>Sub</sub> reiciendis neque et facilis quidem quasi autem tenetur
					adipisci eum aut magni atque cupiditate laboriosam.{' '}
					<a href="#">Link Necessitatibus asperiores</a>
				</p>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
					aspernatur aut corporis eius. Neque consequuntur commodi consectetur
					ullam laudantium saepe.
				</p>

				<ul>
					<li>List</li>
					<li>List</li>
				</ul>

				<ol>
					<li>List ordered</li>
					<li>List ordered</li>
				</ol>

				<footer>Footer such as copyright notice.</footer>
			</Wrapper>
		);
	},
};

export const FooterTemplate = {
	...TemplateSBConfig,
	render: props => (
		<Footer theme={props.theme} weight={props.weight}>
			Footer such as copyright notice.
		</Footer>
	),
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

export const WrapperTemplate: TemplateType = {
	...WrapperStory,
};
