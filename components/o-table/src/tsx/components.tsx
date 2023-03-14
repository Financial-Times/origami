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
	dataType?: 'text' | 'date' | 'number' | 'percent' | 'currency' | 'numeric';
}

export const TableHeading = (args: TableHeadingProps) => {
	return <th scope="col" role="columnheader" {...args}/>
}

interface TableDataProps {
	children?: string | JSX.Element | JSX.Element[];
	verticallyCenter?: boolean;
	dataType?: 'text' | 'date' | 'number' | 'percent' | 'currency' | 'numeric';

}

export const TableData = ({verticallyCenter, ...args}: TableDataProps) => {
	const classNames = [];
	if (verticallyCenter) {
		classNames.push('o-table__cell--vertically-center')
	}
	return <td className={`${classNames.join(' ')}`}{...args}/>
}
export const TableFootnote = args => {
	return <td className='o-table-footnote' {...args} />
}
export const TableCaption = ({children}) => {
	return <caption className='o-table__caption'>{children}</caption>
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
