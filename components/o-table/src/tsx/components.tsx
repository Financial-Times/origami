import {Select} from "@financial-times/o-forms/src/tsx/o-forms";

export const TableHead = args => {
	return <thead {...args}/>
}
export const TableBody = args => {
	return <tbody {...args}/>
}
export const TableFoot = args => {
	return <tfoot {...args} />
}
export const TableRow = args => {
	return <tr {...args}/>
}

interface TableHeadingProps {
	children?: string | JSX.Element | JSX.Element[];
	className?: string;
}

export const TableHeading = (args: TableHeadingProps) => {
	return <th scope="col" role="columnheader" {...args}/>
}
export const NumericTableHeading = (args: TableHeadingProps) => {
	return <TableHeading className='o-table__cell--numeric' data-o-table-data-type="numeric"{...args}/>
}

interface TableDataProps {
	children?: string | JSX.Element | JSX.Element[];
	verticallyCenter?: boolean;
	className?: string;
}

export const TableData = ({verticallyCenter, className, ...args}: TableDataProps) => {
	const classNames = [];
	if(verticallyCenter) {
		classNames.push('o-table__cell--vertically-center')
	}
	return <td className={`${className} {classNames.join(' ')}`}{...args}/>
}
export const TableFootnote = args => {
	return <TableData className='o-table-footnote' {...args} />
}
export const TableCaption = ({children}) => {
	return <caption className='o-table__caption'>{children}</caption>
}
export const NumericTableData = (args: TableDataProps) => {
	return <TableData className='o-table__cell--numeric' {...args}/>
}

export const SelectFilter = () => {
	return <>
		<Select name='Test' title='test' isOptional={false} inlineField={true}></Select>
	</>
}
