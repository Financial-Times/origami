import {useEffect} from "react";
import {ResponsiveScrollTable} from "../src/tsx/table";
import javascript from '../main';
import {baseTableContents} from "./baseTableContents";
import {ComponentMeta} from "@storybook/react";

export default {
	title: 'Components/o-table/Responsive',
	component: ResponsiveScrollTable,
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
