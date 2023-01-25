import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {ComponentMeta} from "@storybook/react";
import './editorialLayout.scss';
import {EditorialLayoutBody} from "../src/tsx/editorialLayoutBody";

export default {
	title: 'Components/o-editorial-layout',
	component: EditorialLayoutBody,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof EditorialLayoutBody>;

const Template = args => {
	return (
		<EditorialLayoutBody {...args}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quaerat!</EditorialLayoutBody>
	);
};

export const Body = Template.bind({});
