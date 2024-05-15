import {FigCaption, Link} from '../src/tsx/typography';
import './typography.scss';
export default {
	title: 'Components/o-typography',
	component: FigCaption,
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

export const FigureCaption = args => <figure>
<img alt="illustration of people at a picnic bench, used as a demo image" src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fa60ae24b-b87f-439c-bf1b-6e54946b4cf2.img?source=origami-build-tools" />
<FigCaption {...args}>
    {args.children ? args.children : <><Link href="#">&#xA9;Lorem</Link> John Doe</>}
</FigCaption>
</figure>;
FigureCaption.args = {children: '' };










