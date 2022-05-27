import type {ComponentMeta, Story} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {ComponentProps, useEffect} from 'react';
import {withDesign} from 'storybook-addon-designs';
import javascript from '../main';
import {Date as ODate} from '../src/tsx/date';

// the storybook args are slightly different to the Date props:
// 1. dateTime is a UNIX timestamp, the format storybook uses in its controls
// 2. the description field appends a description of the timestamp inline
type DateStory = Story<
	Omit<ComponentProps<typeof ODate>, 'dateTime'> & {
		dateTime: number;
		description: string;
	}
>;

const defaultDateTimeObj = new Date();
defaultDateTimeObj.setHours(new Date().getHours() - 6);
const defaultDateTime = defaultDateTimeObj.getTime();

export default {
	title: 'Components/o-date',
	component: ODate,
	decorators: [withDesign, withHtml],
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
		// the description doesn't need to be editable
		description: {table: {disable: true}},
	},
	parameters: {controls: {sort: 'requiredFirst'}},
} as ComponentMeta<typeof ODate>;

const Template: DateStory = ({description, ...args}) => {
	useEffect(() => {
		let tabs = javascript.init();
		return function cleanup() {
			tabs = Array.isArray(tabs) ? tabs : [tabs];
			tabs.forEach(tab => tab.destroy());
		};
	});
	return (
		<>
			<ODate {...{...args, dateTime: new Date(args.dateTime).toISOString()}} />
			{` (${description})`}
		</>
	);
};

export const Abbreviated: DateStory = Template.bind({});
Abbreviated.args = {
	dateTime: new Date('2000-06-14T23:00:00.000Z').getTime(),
	children: 'June 15, 2000',
	description: 'dates far in the past are formatted as exact dates',
};

export const Relative: DateStory = Template.bind({});
Relative.args = {
	description: 'more recent dates are formatted as relative times',
};

export const TodayOrYesterday: DateStory = Template.bind({});
TodayOrYesterday.args = {
	format: 'today-or-yesterday-or-nothing',
	description: 'using the o-date-format option',
};

export const FourHourLimit: DateStory = Template.bind({});
FourHourLimit.storyName = '4 Hour Limit';
FourHourLimit.args = {
	format: 'time-ago-limit-4-hours',
	description: 'using the o-date-format with time-ago-limit-4-hours',
};

export const TwentyFourHourLimit: DateStory = Template.bind({});
TwentyFourHourLimit.storyName = '24 Hour Limit';
TwentyFourHourLimit.args = {
	format: 'time-ago-limit-24-hours',
	description: 'using the o-date-format with time-ago-limit-24-hours',
};

export const CustomFormatting: DateStory = Template.bind({});
CustomFormatting.args = {
	dateTime: new Date('1912-04-15T05:18Z').getTime(),
	format: 'h:mm a',
	description: 'using the o-date-format with custom format string',
};
CustomFormatting.argTypes = {
	format: {control: 'text'},
};

export const Multiple: DateStory = Template.bind({});
Multiple.args = {
	dateTime: new Date('1912-04-15T05:18Z').getTime(),
	format: 'date-only',
	children: (
		<>
			<span data-o-date-printer></span>{' '}
			<span
				data-o-date-printer
				data-o-date-format="time-ago-limit-4-hours"></span>{' '}
			<span data-o-date-printer data-o-date-format="h:mm"></span>
		</>
	),
	description: 'using multiple o-date-format elements',
};
