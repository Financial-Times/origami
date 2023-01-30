import {classBuilder} from "@financial-times/o-forms/src/utils";

export const Table = ({children}) => {
	return <table className="o-table o-table--horizontal-lines" data-o-component="o-table">{children}</table>;
};

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

interface TableDataType {
	dataType?: 'text' | 'date' | 'number' | 'percent' | 'currency' | 'numeric';
}

interface TableHeadingProps extends TableDataType {
	children?: string;
}

export const TableHeading = (args: TableHeadingProps) => {
	return <th {...args}/>
}

interface TableDataProps extends TableDataType {
	children?: string;
}

export const TableData = (args: TableDataProps) => {
	const {dataType, ...childArgs} = args;
	const [addProperty, getClasses] = classBuilder('o-table__cell', false)
	if (dataType === 'numeric') {
		addProperty('numeric')
	}
	return <td className={getClasses()} data-o-table-data-type={dataType} {...childArgs}/>
}

export const TableFootnote = args => {
	return <TableData className='o-table-footnote' {...args} />
}

