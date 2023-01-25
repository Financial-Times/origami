import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {ComponentMeta} from "@storybook/react";
import {EditorialLayoutHeading} from "../src/tsx/editorialLayoutHeading";
import './editorialLayout.scss';

export default {
	title: 'Components/o-editorial-layout',
	component: EditorialLayoutHeading,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof EditorialLayoutHeading>;

const Template = args => {
	return (
		<EditorialLayoutHeading {...args}>Documentation Heading</EditorialLayoutHeading>
	);
};

export const Heading = Template.bind({});
Heading.args = {
	headingLevel: '1'
}
