import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {ComponentMeta} from "@storybook/react";
import {EditorialLayoutWrapper} from "../../src/tsx/editorial-layout-wrapper";
import './editorialLayout.scss';

export default {
	title: 'Components/o-editorial-layout',
	component: EditorialLayoutWrapper,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof EditorialLayoutWrapper>;

const Template = () => {
	return (
		<EditorialLayoutWrapper>
			<h1>heading 1</h1>
			<h2>heading 2</h2>

			<p><a href="components/o-editorial-layout/stories#">Lorem ipsum dolor sit amet consectetur</a> adipisicing elit.</p>

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

export const Wrapper = Template.bind({});
