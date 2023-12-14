import ODate from '@financial-times/o-date/main';
import {Date as DateTSX} from '@financial-times/o-date/src/tsx/date';
import type {Meta, Story} from '@storybook/react';
import {useEffect} from 'react';
import {TimestampLabel as OTimestampLabel, TimestampLabelProps} from '../../src/tsx/label';
import '../labels.scss';

export default {
	title: 'Components/o-labels',
	component: OTimestampLabel,
	argTypes: {
		inverse: {control: 'boolean', defaultValue: false},
		dateTime: {control: 'date'},
	},
} as Meta<TimestampLabelProps>;

export const TimestampLabel: Story<TimestampLabelProps & {dateTime: Date}> = args => {
	useEffect(() => {
		let dates = ODate.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});

	const dateString = new Date(args.dateTime).toISOString()
	return <OTimestampLabel {...args} >
		<DateTSX dateTime={dateString} />
	</OTimestampLabel>;
};

TimestampLabel.args = {
	dateTime: new Date(2022, 1, 10, 8, 30),
};
