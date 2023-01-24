import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {ComponentMeta} from "@storybook/react";
import {EditorialLayoutWrapper} from "../src/tsx/editorialLayoutWrapper";
import './editorialLayout.scss';

export default {
	title: 'Components/o-editorial-layout/wrapper',
	component: EditorialLayoutWrapper,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof EditorialLayoutWrapper>;

const Template = args => {
	return (
		<EditorialLayoutWrapper>
			<h1>heading 1</h1>
			<h2>heading 2</h2>

			<p><a href="#">Lorem ipsum dolor sit amet consectetur</a> adipisicing elit.</p>

			<blockquote>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quaerat!</p>
				<footer><cite>Lorem, ipsum dolor.</cite></footer>
			</blockquote>

			<p><em>Some italic copy</em> adipisci consectetur.</p>

			<p>Quas<sup>sup</sup> and dolorem<sub>sub</sub> harum tempora omnis.</p>

			<ol>
				<li>Lorem ipsum&#xA0;adipiscing elit.</li>
				<li>Sed feugiat turpis at massa tristique.</li>
				<li>Curabitu r accumsan elit luctus.</li>
			</ol>
		</EditorialLayoutWrapper>
	);
};

export const EditorialLayoutWrapperWithChildren = Template.bind({});
