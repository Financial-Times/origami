interface TableProps {
	horizontalLines?: boolean;
	id: string;
	stripes?: boolean;
	sortable?: boolean;
	children: string | React.JSX.Element | React.JSX.Element[];
	compact?: boolean;
}

export const Table = (args: TableProps) => {
	const {children, ...otherArgs} = args;
	return <PrivateTable {...otherArgs}>{children}</PrivateTable>
}

export const ResponsiveScrollTable = ({
										  children,
										  compact,
										  horizontalLines = true,
										  ...args
									  }: TableProps) => {
	return (
		<ResponsiveTable compact={compact} horizontalLines={horizontalLines}
						 behaviour='scroll' {...args}
						 className={`o-table--responsive-scroll`}>{children}</ResponsiveTable>

	)
}

export const ResponsiveFlatTable = ({
										children,
										compact,
										horizontalLines = true,
										...args
									}: TableProps) => {
	return (
		<ResponsiveTable compact={compact} horizontalLines={horizontalLines}
						 behaviour='flat' {...args}
						 className={`o-table--responsive-flat`}>{children}</ResponsiveTable>

	)
}

interface ResponsiveOverflowTableProps extends TableProps {
	expanded?: boolean;
	minimumRows?: string;
}

export const ResponsiveOverflowTable = ({
											children,
											compact,
											horizontalLines = true,
											minimumRows,
											...args
										}: ResponsiveOverflowTableProps) => {
	const attributes: Record<string, any> = {};

	if (minimumRows) {
		attributes['data-o-table-minimum-row-count'] = minimumRows;
	}

	return (
		<ResponsiveTable compact={compact} horizontalLines={horizontalLines}
						 behaviour='overflow'
						 className={`o-table--responsive-flat`} {...attributes} {...args}>{children}</ResponsiveTable>

	)
}

interface PrivateTableProps extends TableProps {
	className?: string;
}

const PrivateTable = ({
						  children,
						  compact,
						  horizontalLines = true,
						  sortable,
						  className,
						  stripes,
						  ...args
					  }: PrivateTableProps) => {
	const classNames = ['o-table', className && className.split(' ')];
	const attributes: Record<string, any> = {};

	if (!sortable) {
		attributes['data-o-table-sortable'] = false;
	}
	if (compact) {
		classNames.push('o-table--compact');
	}
	if (horizontalLines) {
		classNames.push('o-table--horizontal-lines');
	}
	if (stripes) {
		classNames.push('o-table--row-stripes');
	}
	return (
		<div className='o-table-container'>
			<table className={classNames.join(' ')}
				   data-o-component="o-table" {...attributes} {...args}>{children}</table>
		</div>
	);
};


interface ResponsiveTableProps extends PrivateTableProps {
	behaviour: 'scroll' | 'overflow' | 'flat';
	expanded?: boolean;
	minimumRows?: number;
}

const ResponsiveTable = ({
							 children,
							 compact,
							 horizontalLines = true,
							 behaviour,
							 expanded,
							 minimumRows,
							 ...args
						 }: ResponsiveTableProps) => {

	return (
		<div className="o-table-container">
			<div className="o-table-overlay-wrapper">
				<div className='o-table-scroll-wrapper'>
					<PrivateTable compact={compact} horizontalLines={horizontalLines} data-o-table-expanded={false}
								  data-o-table-responsive={behaviour} {...args}
								  className={`o-table--responsive-${behaviour}`}>{children}</PrivateTable>
				</div>
			</div>
		</div>
	)
}
