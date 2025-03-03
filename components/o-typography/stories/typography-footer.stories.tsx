import {Footer as FooterComponent} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Deprecated/o-typography',
	component: FooterComponent,
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

export const Footer = args => (
	<FooterComponent {...args}>Footer such as copyright notice.</FooterComponent>
);
