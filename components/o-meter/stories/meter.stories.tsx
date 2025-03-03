import {Fragment} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Meter} from '../src/tsx/meter';
import './meter.scss';
import {higherIsBetterDemoData, lowerIsBetterDemoData} from './meterData';

export default {
	title: 'Maintained/o-meter',
	component: Meter,
	args: {
		min: 0,
		max: 100,
		low: 0,
		high: 100,
		optimum: 100,
		valueBox: false,
	},
} as ComponentMeta<typeof Meter>;

const Story: ComponentStory<typeof Meter> = args => <Meter {...args} />;
const ComplexStory = args => {
	let meters = args.items;
	return (
		<Fragment>
			{meters.map(({description, meterArgs}, i) => (
				<Fragment key={i}>
					<p dangerouslySetInnerHTML={{__html: description}} />
					<Meter {...meterArgs}></Meter>
				</Fragment>
			))}
		</Fragment>
	);
};

export const simpleMeter: ComponentStory<typeof Meter> = Story.bind({});
simpleMeter.args = {
	label: 'demo meter 33',
	value: 33,
};

export const higherIsBetter = ComplexStory.bind({});
higherIsBetter.storyName =
	'Simple Meter With Different Values Where Higher Is Better';
higherIsBetter.args = {
	items: higherIsBetterDemoData,
};

export const lowerIsBetter = ComplexStory.bind({});
lowerIsBetter.storyName =
	'Simple Meter With Different Values Where Lower Is Better';
lowerIsBetter.args = {
	items: lowerIsBetterDemoData,
};

export const optionalBox: ComponentStory<typeof Meter> = Story.bind({});
optionalBox.storyName = 'Meter With Optional Value Box';
optionalBox.args = {
	label: 'demo meter 2.5',
	value: 2.5,
	max: 10,
	high: 10,
	valueBox: true,
};
