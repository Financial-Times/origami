import {Fragment} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {withDesign} from 'storybook-addon-designs';
import withHtml from 'origami-storybook-addon-html';

import {Meter} from '../src/tsx/meter';
import './meter.scss';
import {higherIsBetterDemoData, lowerIsBetterDemoData} from './meterData';

export default {
	title: 'Components/o-meter',
	component: Meter,
	decorators: [withDesign, withHtml],
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
	ariaLabel: 'demo meter 33',
	meterValue: 33,
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
	ariaLabel: 'demo meter 2.5',
	meterValue: 2.5,
	max: 10,
	high: 10,
	valueBox: true,
};

export const customisedColors: ComponentStory<typeof Meter> = Story.bind({});
customisedColors.storyName = 'Meter With Customised Colours';

customisedColors.args = {
	ariaLabel: 'demo meter 80',
	meterValue: 80,
	customColors: {
		'--o-meter-background-color': 'lightgray',
		'--o-meter-optimum-color': 'deeppink',
		'--o-meter-sub-optimum-color': 'hotpink',
		'--o-meter-less-than-sub-optimum-color': 'pink',
	},
};

export const customisedDimensions: ComponentStory<typeof Meter> = Story.bind(
	{}
);
customisedDimensions.storyName = 'Meter With Customised Dimensions';
customisedDimensions.args = {
	ariaLabel: 'demo meter 25',
	meterValue: 25,
	customDimensions: {
		'--o-meter-width': '300px',
		'--o-meter-height': '30px',
	},
};

export const customDimensionsWithValueBox: ComponentStory<typeof Meter> =
	Story.bind({});

customDimensionsWithValueBox.storyName =
	'Meter With Value Box And Customised Dimensions';
customDimensionsWithValueBox.args = {
	ariaLabel: 'demo meter 25',
	meterValue: 25,
	customDimensions: {
		'--o-meter-width': '70%',
		'--o-meter-height': '2em',
	},
	valueBox: true,
};
