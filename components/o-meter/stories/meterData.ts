import {MeterProps} from '../src/tsx/meter';

type ListProps = {
	description: string;
	meterArgs: MeterProps;
};

const higherIsBetterDefaults = {
	ariaLabel: 'demo meter ',
	min: 0,
	max: 100,
	low: 25,
	high: 75,
	optimum: 100,
};

const lowerIsBetterDefaults = {
	ariaLabel: 'demo meter ',
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
			meterValue: 10,
		},
	},

	{
		description:
			'Higher values are best in the following meter. It has a value &lt; high, value &gt; low, optimum &gt; high.',
		meterArgs: {
			...higherIsBetterDefaults,
			meterValue: 35,
		},
	},
	{
		description:
			'Higher values are best in the following meter. It has a value &gt; high, value &gt; low, optimum &gt; high.',
		meterArgs: {
			...higherIsBetterDefaults,
			meterValue: 80,
		},
	},
];

export const lowerIsBetterDemoData: ListProps[] = [
	{
		description:
			'Lower values are best in the following meter. It has a value &gt; high, value &gt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			meterValue: 60,
		},
	},
	{
		description:
			'Lower values are best in the following meter. It has a value &lt; high, value &gt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			meterValue: 40,
		},
	},
	{
		description:
			'Lower values are best in the following meter. It has a value &lt; high, value &lt; low, optimum &lt; low.',
		meterArgs: {
			...lowerIsBetterDefaults,
			meterValue: 10,
		},
	},
];
