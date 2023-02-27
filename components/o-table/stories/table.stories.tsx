import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import './table.scss';
import {Table} from "../src/tsx/table";
import {TableCaption, TableFoot, TableFootnote, TableRow} from "../src/tsx/components";
import {baseTableContents} from "./baseTableContents";

export default {
	title: 'Components/o-table/Basic',
	component: Table,
	decorators: [withDesign, withHtml]
};

const Template = (args) => {

	return <Table {...args}>
		{baseTableContents}
	</Table>;
}
export const BasicTable = Template.bind({});

export const BasicTableWithCaptionAndFootnote = (args) => {
	return <Table {...args}>
		<TableCaption>
			<h2 className="o-typography-heading-level-2">Table Caption</h2>
		</TableCaption>
		{baseTableContents}
		<TableFoot>
			<TableRow>
				<TableFootnote>Source: The Origami team&apos;s love of fruit.</TableFootnote>
			</TableRow>
		</TableFoot>
	</Table>
}


