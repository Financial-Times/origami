type AllowAnyString = (string & Record<never, never>);

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
	children?: string | React.JSX.Element | React.JSX.Element[];
	dataType?: 'text' | 'date' | 'number' | 'percent' | 'currency' | 'numeric' | AllowAnyString;
}

export const TableHeading = (args: TableHeadingProps) => {
	return <th scope="col" role="columnheader" {...args}/>
}

interface TableDataProps {
	children?: string | React.JSX.Element | React.JSX.Element[];
	verticallyCenter?: boolean;
	dataType?: 'text' | 'date' | 'number' | 'percent' | 'currency' | 'numeric' | AllowAnyString;
	dataValue?: any;

}

export const TableData = ({verticallyCenter, dataValue,  ...args}: TableDataProps) => {
	const classNames = [];
	const attributes = {};
	if(dataValue) {
		attributes['data-o-table-sort-value'] = dataValue
	}
	if (verticallyCenter) {
		classNames.push('o-table__cell--vertically-center')
	}
	return <td className={`${classNames.join(' ')}`} {...attributes} {...args}/>
}
export const TableFootnote = args => {
	return <td className='o-table-footnote' {...args} />
}
export const TableCaption = ({children}) => {
	return <caption className='o-table__caption'>{children}</caption>
}


interface FilterProps {
	filterComponent: React.JSX.Element | React.JSX.Element[];
	id: string;
	filterId: string;
	filterColumn: string;
}

export const Filter = ({filterComponent, filterId, filterColumn}: FilterProps) => {
	return (
		<div data-o-table-filter-id={filterId} data-o-table-filter-column={filterColumn}>
			{filterComponent}
		</div>)
}
