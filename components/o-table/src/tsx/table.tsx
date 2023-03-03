interface TableProps {
	children: string | JSX.Element | JSX.Element[];
	compact?: boolean;
	horizontalLines?: boolean;
	stripes?: boolean;
	className?: string;
	sortable?: boolean;
}

export const Table = ({
						  children,
						  compact,
						  horizontalLines = true,
						  className,
						  sortable,
						  stripes,
						  ...args
					  }: TableProps) => {
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
	return <table className={classNames.join(' ')}
				  data-o-component="o-table" {...attributes} {...args}>{children}</table>;
};

interface ResponsiveTableProps extends TableProps {
	behaviour: 'scroll' | 'overflow' | 'flat';
	expanded?: boolean;
	minimumRows?: number;
}

export const ResponsiveTable = ({
									children,
									compact,
									horizontalLines = true,
									behaviour,
									expanded,
									minimumRows,
									...args
								}: ResponsiveTableProps) => {
	const attributes: Record<string, any> = {};

	if (minimumRows) {
		attributes['data-o-table-minimum-row-count'] = minimumRows;
	}

	return (
		<div className="o-table-container">
			<div className="o-table-overlay-wrapper">
				<div className='o-table-scroll-wrapper'>
					<Table compact={compact} horizontalLines={horizontalLines} data-o-table-expanded={false}
						   data-o-table-responsive={behaviour} {...attributes} {...args}
						   className={`o-table--responsive-${behaviour}`}>{children}</Table>
				</div>
			</div>
		</div>
	)
}


