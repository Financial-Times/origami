import {useEffect} from "react";
import {ResponsiveTable, Table} from "../src/tsx/table";
import withHtml from 'origami-storybook-addon-html';
import javascript from '../main';
import {baseTableContents} from "./baseTableContents";
import {withDesign} from "storybook-addon-designs";

export default {
	title: 'Components/o-table/Responsive',
	component: Table,
	decorators: [withDesign, withHtml]
};

export const TableWithResponsiveOverflow = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveTable behaviour='overflow' {...args}>{baseTableContents}</ResponsiveTable>
}
export const TableWithResponsiveScroll = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveTable behaviour='scroll' {...args}>{baseTableContents}</ResponsiveTable>
}
export const TableWithResponsiveFlat = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveTable behaviour='flat' {...args}>{baseTableContents}</ResponsiveTable>
}
