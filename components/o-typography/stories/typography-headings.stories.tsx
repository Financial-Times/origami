import {Heading} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Components/o-typography',
	component: Heading,
    args: {},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A1433',
		},
		guidelines: {
			notion: 'f82c8bd1ef1f4f649a61d17d5d49750c',
		},
		html: {},
	},
};

export const UIHeadings = args => <>
	<Heading level={1} copy={args.copy || 'Heading level 1'} />
	<Heading level={2} copy={args.copy || 'Heading level 2'} />
	<Heading level={3} copy={args.copy || 'Heading level 3'} />
	<Heading level={4} copy={args.copy || 'Heading level 4'} />
	<Heading level={5} copy={args.copy || 'Heading level 5'} />
	<Heading level={6} copy={args.copy || 'Heading level 6'} />
</>;
UIHeadings.args = {copy: '' };
