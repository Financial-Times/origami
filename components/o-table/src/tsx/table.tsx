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


