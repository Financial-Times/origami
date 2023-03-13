import {Table} from "../src/tsx/table";
import {withDesign} from "storybook-addon-designs";
import withHtml from 'origami-storybook-addon-html';
import {baseTableContents} from "./baseTableContents";
import {SelectFilter, TextInputFilter} from "../src/tsx/components";
import {useEffect} from "react";
import javascript from '../main';

export default {
	title: 'Components/o-table/Table with Filter',
	component: Table,
	decorators: [withDesign, withHtml]
};

export const TableWithSelectFilter = (_args) => {
	useEffect(() => {
		javascript.init();
	})
	return (
		<>
			<div id='demo-table-caption'>
				<h2 className="o-typography-heading-level-2">What fruit is the frutiest?</h2>
				<SelectFilter label='Filter by characteristic:' id='filter-select' filterId='fruit-filter'
							  filterColumn='2'>
					<option value="">All</option>
					<option value="Juicy">Juicy</option>
					<option value="Smelly">Smelly</option>
					<option value="Chewy">Chewy</option>
					<option value="Sweet">Sweet</option>
					<option value="Crunchy">Crunchy</option>
				</SelectFilter>
			</div>
			<div className='o-table-container'>
				<Table id='fruit-filter' aria-describedby='demo-table-caption'>
					{baseTableContents}
				</Table>
			</div>
		</>
	)
}

export const TableWithTextInput = (_args) => {
	useEffect(() => {
		javascript.init();
	})
	return (
		<>
			<div id='demo-table-caption'>
				<h2 className="o-typography-heading-level-2">What fruit is the frutiest?</h2>

				<TextInputFilter label='Filter by characteristic:' id='fruity-filter' filterId='fruit-filter'
								 filterColumn='2'/>
			</div>
			<div className='o-table-container'>
				<Table id='fruit-filter' aria-describedby='demo-table-caption'>
					{baseTableContents}
				</Table>
			</div>
		</>
	)
}
