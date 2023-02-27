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
}

export const ResponsiveTable = ({children, compact, horizontalLines = true, behaviour}: ResponsiveTableProps) => {
	return (
		<div className="o-table-container">
			<div className="o-table-overlay-wrapper">
				<div className='o-table-scroll-wrapper'>
					<Table compact={compact} horizontalLines={horizontalLines} data-o-table-responsive={behaviour}
						   className={`o-table--responsive-${behaviour}`}>{children}</Table>
				</div>
			</div>
		</div>
	)
}


