interface TableProps {
	children: string | JSX.Element | JSX.Element[];
	compact?: boolean;
	horizontalLines?: boolean;

	className?: string;
}

export const Table = ({children, compact, horizontalLines = true, className, ...args}: TableProps) => {
	const classNames = ['o-table', className && className.split(' ')];


	if (compact) {
		classNames.push('o-table--compact');
	}
	if (horizontalLines) {
		classNames.push('o-table--horizontal-lines');
	}
	return <table className={classNames.join(' ')} data-o-component="o-table" {...args}>{children}</table>;
};

interface ResponsiveTableProps extends TableProps {
	behaviour: 'scroll' | 'overflow' | 'flat';
	expanded?: boolean;
	minimumRows?: number;
}

export const ResponsiveTable = ({children, compact, horizontalLines = true, behaviour,expanded,  minimumRows,  ...args}: ResponsiveTableProps) => {
	const attributes: Record<string, any> = {};

	if(minimumRows) {
		attributes['data-o-table-minimum-row-count'] = minimumRows;
	}

	return (
		<div className="o-table-container">
			<div className="o-table-overlay-wrapper">
				<div className='o-table-scroll-wrapper'>
					<Table compact={compact} horizontalLines={horizontalLines} data-o-table-expanded={false} data-o-table-responsive={behaviour} {...attributes} {...args}
						   className={`o-table--responsive-${behaviour}`}>{children}</Table>
				</div>
			</div>
		</div>
	)
}


