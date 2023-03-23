import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import './table.scss';
import {Table} from "../src/tsx/table";
import {TableCaption, TableFoot, TableFootnote, TableRow} from "../src/tsx/components";

import {useEffect} from "react";
import javascript from '../main';
import {baseTableContents} from "./baseTableContents";

export default {
	title: 'Components/o-table/Basic',
	component: Table,
	decorators: [withDesign, withHtml]
};

const Template = (args) => {
	useEffect(() => {
		javascript.init();
	});

	return <Table {...args}>
		{baseTableContents}
	</Table>;
}
export const BasicTable = Template.bind({});

export const BasicTableWithCaptionAndFootnote = (args) => {
	useEffect(() => {
		javascript.init();
	});

	return <Table {...args}>
		<TableCaption>
			<h2 className="o-typography-heading-level-2">Origami Team's Favourite Fruit</h2>
		</TableCaption>
		{baseTableContents}
		<TableFoot>
			<TableRow>
				<TableFootnote colspan="5">Source: The Origami team&apos;s love of fruit.</TableFootnote>
			</TableRow>
		</TableFoot>
	</Table>
}


