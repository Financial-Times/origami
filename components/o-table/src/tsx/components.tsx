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
	if (verticallyCenter) {
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


interface FilterProps {
	label: string;
	id: string;
	filterId: string;
	filterColumn: string;
}

interface SelectFilterProps extends FilterProps {
	children: JSX.Element | JSX.Element[];

}

export const SelectFilter = ({label, id, filterId, filterColumn, children}: SelectFilterProps) => {
	return (
		<Select name='Test' title={label} isOptional={false} inlineField={true} isVerticalCenter={true}
				additionalAttributes={{
					'data-o-table-filter-id': filterId,
					'data-o-table-filter-column': filterColumn,
					id
				}}>
			{children}
		</Select>
	)
}
export const TextInputFilter = ({id, label, filterId, filterColumn}: FilterProps) => {
	return (
		<label className="o-forms-field o-forms-field--inline o--if-js o-forms-field--demo">
        	<span className="o-forms-title o-forms-title--vertical-center o-forms-title--shrink">
          		<span className="o-forms-title__main">{label}</span>
        	</span>

			<span className="o-forms-input o-forms-input--text o-forms-input--invalid">
				<input type="text" data-o-table-filter-id={filterId} data-o-table-filter-column={filterColumn}
					   id={id}
					   className="o-forms__text"/>
        	</span>
		</label>
	)
}
