import {Link} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Components/o-typography',
	component: Link,
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

const Story = args => <Link {...args} />;

export const StandardLink = Story.bind({});
StandardLink.args = {
	children: 'link to another page',
	href: '#'
};
