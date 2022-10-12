import ODate from '@financial-times/o-date/main';
import {Date as DateTSX} from '@financial-times/o-date/src/tsx/date';
import type {Meta, Story} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {useEffect} from 'react';
import {withDesign} from 'storybook-addon-designs';
import {TimestampLabel as OTimestampLabel, TimestampProps} from '../src/tsx/label';
import './labels.scss';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND;

export default {
	title: 'Components/o-labels',
	component: OTimestampLabel,
	includeStories: (brand === 'core' ? ['TimestampLabel'] : []),
	decorators: [withDesign, withHtml],
	argTypes: {
		inverse: {control: 'boolean', defaultValue: false},
		dateTime: {control: 'date'},
	},
} as Meta<TimestampProps>;

export const TimestampLabel: Story<TimestampProps & {dateTime: Date}> = args => {
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
