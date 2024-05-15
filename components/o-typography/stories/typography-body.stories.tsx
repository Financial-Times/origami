import {P, Span, Sup, Sub, Strong, Em, Link} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Components/o-typography',
	component: P,
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

const Story = args => <>
    <P {...args}>
        <Span weight='bold'>Body</Span> - Lorem ipsum dolor sit amet, consectetur adipisicing elit. <Link href="#">Link</Link> a rem <Strong>excepturi</Strong> consequuntur commodi dolores ad <Em>laboriosam</Em> qui odit ipsum distinctio quos laborum dolore magnam iure rerum, enim deleniti saepe sunt.
    </P>
    <P {...args}>
        Lorem ipsum dolor sit amet<Sup>Sup</Sup>, consectetur adipisicing elit<Sub>Sub</Sub>. <Link href="#">Link Necessitatibus asperiores</Link>.
    </P>
</>;

export const Body = Story.bind({});
