interface TableProps {
	children: string | JSX.Element | JSX.Element[];
	compact?: boolean;
	horizontalLines?: boolean;
	className?: string;
}

export const Table = ({children, compact, horizontalLines = true, className, ...args}: TableProps) => {
	const classNames = ['o-table', className.split(' ')];

	if (compact) {
		classNames.push('o-table--compact');
	}
	if (horizontalLines) {
		classNames.push('o-table--horizontal-lines');
	}
	return <table className={classNames.join(' ')} data-o-component="o-table" {...args}>{children}</table>;
};

export const ResponsiveOverflowTable = ({children, compact, horizontalLines = true}: TableProps) => {
	return (
		<div className="o-table-container">
			<div className="o-table-overlay-wrapper">
				<div className='o-table-scroll-wrapper'>
					<Table compact={compact} horizontalLines={horizontalLines} data-o-table-responsive='overflow'
						   className='o-table--responsive-overflow'>{children}</Table>
				</div>
			</div>
		</div>
	)
}

//TODO: move these to components/ ?
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
}

export const TableHeading = (args: TableHeadingProps) => {
	return <th scope="col" role="columnheader" {...args}/>
}

export const NumericTableHeading = (args: TableHeadingProps) => {
	return <TableHeading className='o-table__cell--numeric' data-o-table-data-type="numeric"{...args}/>
}

interface TableDataProps {
	children?: string | JSX.Element | JSX.Element[];
	className?: string;
}

export const TableData = (args: TableDataProps) => {
	return <td {...args}/>
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
