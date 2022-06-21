import {MeterProps} from '../src/tsx/meter';

type ListProps = {
	description: string;
	meterArgs: MeterProps;
};

const higherIsBetterDefaults = {
	label: 'demo meter ',
	min: 0,
	max: 100,
	low: 25,
	high: 75,
	optimum: 100,
};

const lowerIsBetterDefaults = {
	label: 'demo meter ',
	min: 0,
	max: 100,
	low: 25,
	high: 50,
	optimum: 0,
};


export const higherIsBetterDemoData: ListProps[] = [
	{
		description:
			'Higher values are best in the following meter. It has a value &lt; high, value &lt; low, optimum &gt; high.',
		meterArgs: {
			...higherIsBetterDefaults,
			value: 10,
		},
	},

	{
		description:
			'Higher values are best in the following meter. It has a value &lt; high, value &gt; low, optimum &gt; high.',
		meterArgs: {
			...higherIsBetterDefaults,
			value: 35,
		},
	},
	{
		description:
			'Higher values are best in the following meter. It has a value &gt; high, value &gt; low, optimum &gt; high.',
		meterArgs: {
			...higherIsBetterDefaults,
			value: 80,
		},
	},
];

export const lowerIsBetterDemoData: ListProps[] = [
	{
		description:
			'Lower values are best in the following meter. It has a value &gt; high, value &gt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			value: 60,
		},
	},
	{
		description:
			'Lower values are best in the following meter. It has a value &lt; high, value &gt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			value: 40,
		},
	},
	{
		description:
			'Lower values are best in the following meter. It has a value &lt; high, value &lt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			value: 10,
		},
	},
];
