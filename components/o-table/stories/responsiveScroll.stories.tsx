import {useEffect} from "react";
import {ResponsiveScrollTable} from "../src/tsx/table";
import withHtml from 'origami-storybook-addon-html';
import javascript from '../main';
import {withDesign} from "storybook-addon-designs";
import {baseTableContents} from "./baseTableContents";
import {ComponentMeta} from "@storybook/react";

export default {
	title: 'Components/o-table/Responsive',
	component: ResponsiveScrollTable,
	decorators: [withDesign, withHtml],
	args: {
		horizontalLines: true,
		compact: false,
		stripes: false
	}
} as ComponentMeta<typeof ResponsiveScrollTable>;

export const TableWithResponsiveScroll = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveScrollTable {...args}>{baseTableContents}</ResponsiveScrollTable>
}
