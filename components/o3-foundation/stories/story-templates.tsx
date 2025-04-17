import type {Meta} from '@storybook/react';
import {transformCode} from './utils';
import {O3Grid} from './grid';
import './grid-sb-styles.css';
import {UnorderedList, OrderedList, Wrapper} from '../src/tsx';
import type {StoryObj} from '@storybook/react';
import {SpacingDemo} from './spacing-sb-story-component';
import './spacing-sb-styles.css';
import links from '@financial-times/o3-figma-sb-links';
import {Icon, icons} from './icon-sb-story-component';
import './icon-sb-styles.css';
import {ColorPalette} from './color-sb-story-components';
import './color-sb-styles.css';

export type BrandType =
	| 'core'
	| 'core-professional'
	| 'whitelabel'
	| 'internal'
	| 'sustainable-views';

export function GridMetaGenerator(brand: BrandType): Meta {
	return {
		component: O3Grid,
		decorators: [
			Story => (
				<div data-o3-brand={brand.split('/')[0]}>
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

export function SpacingMetaGenerator(brand: BrandType): Meta {
	return {
		component: SpacingDemo,
		decorators: [
			Story => (
				<div data-o3-brand={brand.split('/')[0]}>
					<Story />
				</div>
			),
		],
		parameters: {
			backgrounds: {disable: true},
			design: {
				type: 'figma',
				url: links[`${brand}-o3-foundation-o3-spacing--spacing`].figma,
			},
		},
		args: {
			name: 'xl',
		},
	};
}

export function IconMetaGenerator(brand: BrandType): Meta {
	return {
		component: Icon,
		decorators: [
			Story => (
				<div data-o3-brand={brand.split('/')[0]}>
					<Story />
				</div>
			),
		],
		parameters: {
			backgrounds: {disable: true},
			design: {
				type: 'figma',
				url: links[`${brand}-o3-foundation-o3-icon--icon`].figma,
			},
		},
		argTypes: {
			name: {
				options: icons,
				control: {
					type: 'select',
				},
			},
		},
		args: {
			name: 'at',
		},
	};
}

export function ColorPaletteMetaGenerator(brand: BrandType): Meta {
	return {
		component: ColorPalette,
		decorators: [
			Story => (
				<div data-o3-brand={brand.split('/')[0]}>
					<Story />
				</div>
			),
		],
		render: (_args, {loaded}) => (
			<ColorPalette colors={loaded.colors} brand={brand} />
		),
		parameters: {
			backgrounds: {disable: true},
		},
		argTypes: {
			colors: {
				control: false,
				table: {
					disable: true,
				},
			},
		},
	};
}

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

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const Headings = {
	...TemplateSBConfig,
	argTypes: {
		...TemplateSBConfig.argTypes,
		level: {
			options: ['1', '2', '3', '4', '5'],
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

				<a className="o3-type-body-base" href="#">
					Link by itself.
				</a>

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

				<figcaption>This is a caption</figcaption>
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

export const HeadingTemplate: TemplateType = {
	...Headings,
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
