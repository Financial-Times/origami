import type {ComponentMeta, Story} from '@storybook/react';
import {ComponentProps, useEffect} from 'react';
import javascript from '../main';
import {Date as ODate, DatePrinter} from '../src/tsx/date';

// the storybook args are slightly different to the Date props as dateTime is a
// UNIX timestamp, the format storybook uses in its controls
type DateStory = Story<
	Omit<ComponentProps<typeof ODate>, 'dateTime'> & {
		dateTime: number;
	}
>;

const defaultDateTimeObj = new Date();
defaultDateTimeObj.setHours(new Date().getHours() - 6);
const defaultDateTime = defaultDateTimeObj.getTime();

export default {
	title: 'Components/o-date',
	component: ODate,
	argTypes: {
		dateTime: {control: 'date', defaultValue: defaultDateTime},
		format: {
			control: 'select',
			options: [
				'today-or-yesterday-or-nothing',
				'date-only',
				'time-ago-limit-4-hours',
				'time-ago-limit-24-hours',
				'time-ago-abbreviated',
				'time-ago-abbreviated-limit-4-hours',
				'time-ago-no-seconds',
			],
		},
		textCase: {
			options: [
				null,
				'sentence',
				'upper'
			],
			control: {
				type: 'select',
				labels: {
					'null': 'Default',
					'sentence': 'Sentence',
					'upper': 'Upper'
				},
			}
		}
	},
	parameters: {controls: {sort: 'requiredFirst'}},
} as ComponentMeta<typeof ODate>;

const Template: DateStory = args => {
	useEffect(() => {
		let dates = javascript.init();
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates];
			dates.forEach(date => date.destroy());
		};
	});
	return (
		<ODate {...{...args, dateTime: new Date(args.dateTime).toISOString()}} />
	);
};

export const Abbreviated: DateStory = Template.bind({});
Abbreviated.args = {
	dateTime: new Date('2000-06-14T23:00:00.000Z').getTime(),
	children: 'June 15, 2000',
};

export const Relative: DateStory = Template.bind({});
Relative.args = {
	dateTime: new Date('2000-06-14T23:00:00.000Z').getTime(),
};

const dateToday = new Date();
export const TodayOrYesterday: DateStory = Template.bind({});
TodayOrYesterday.args = {
	dateTime: dateToday.getTime(),
	format: 'today-or-yesterday-or-nothing',
};

const dateFourHourLimit = new Date();
dateFourHourLimit.setHours(dateFourHourLimit.getHours() - 2);

export const FourHourLimit: DateStory = Template.bind({});
FourHourLimit.storyName = '4 Hour Limit';
FourHourLimit.args = {
	format: 'time-ago-limit-4-hours',
	dateTime: dateFourHourLimit.getTime(),
};

const dateTwentyFourHourLimit = new Date();
dateTwentyFourHourLimit.setHours(dateTwentyFourHourLimit.getHours() - 6);
export const TwentyFourHourLimit: DateStory = Template.bind({});
TwentyFourHourLimit.storyName = '24 Hour Limit';
TwentyFourHourLimit.args = {
	dateTime: dateTwentyFourHourLimit.getTime(),
	format: 'time-ago-limit-24-hours',
};

export const CustomFormatting: DateStory = Template.bind({});
CustomFormatting.args = {
	dateTime: new Date('1912-04-15T05:18Z').getTime(),
	format: 'h:mm a',
};
CustomFormatting.argTypes = {
	dateTime: new Date('2000-06-14T23:00:00.000Z').getTime(),
	format: {control: 'text'},
};

export const Multiple: DateStory = Template.bind({});
Multiple.args = {
	dateTime: new Date('1912-04-15T05:18Z').getTime(),
	format: 'date-only',
	children: (
		<>
			<DatePrinter /> <DatePrinter format={'time-ago-limit-4-hours'} />{' '}
			<DatePrinter format={'h:mm'} />
		</>
	),
};
