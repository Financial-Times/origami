import {Wrapper} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Deprecated/o-typography',
	component: Wrapper,
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

export const TypographyWrapper = args => (
	<Wrapper {...args}>
		<h1>Heading level 1</h1>
		<h2>Heading level 2</h2>
		<h3>Heading level 3</h3>
		<h4>Heading level 4</h4>
		<h5>Heading level 5</h5>
		<h6>Heading level 6</h6>

		<p>
			Body - Lorem ipsum dolor sit amet, consectetur adipisicing elit.{' '}
			<a href="#">Link</a> a rem <strong>excepturi</strong> consequuntur commodi
			dolores ad <em>laboriosam</em> qui odit ipsum distinctio quos laborum
			dolore magnam iure rerum, enim deleniti saepe sunt.
		</p>
		<p>
			Lorem ipsum dolor sit amet<sup>Sup</sup>, consectetur adipisicing elit
			<sub>Sub</sub> reiciendis neque et facilis quidem quasi autem tenetur
			adipisci eum aut magni atque cupiditate laboriosam.{' '}
			<a href="#">Link Necessitatibus asperiores</a>
		</p>

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
			aspernatur aut corporis eius. Neque consequuntur commodi consectetur ullam
			laudantium saepe.
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
