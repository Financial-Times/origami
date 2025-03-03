import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {RadioBoxLink, RadioBoxLinks} from '../src/tsx/o-forms';
import {demoArgs} from './fixtures/pseudoRadioBoxArgs';
import './forms.scss';
import javascript from '../main.js';

const hideArg = {
	table: {
		disable: true,
	},
};

export default {
	title: 'Maintained/o-forms/pseudo-box-radio-links',
	component: RadioBoxLinks,
	argTypes: {
		children: hideArg,
		theme: hideArg,
		...demoArgs,
	},
} as ComponentMeta<typeof RadioBoxLinks>;

const Template: ComponentStory<any> = args => {
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return (
		<RadioBoxLinks>
			<RadioBoxLink
				href={args.hrefLinkA}
				value={args.valueLinkA}
				isCurrent={args.isCurrentLinkA}
			/>
			<RadioBoxLink
				href={args.hrefLinkB}
				value={args.valueLinkB}
				isCurrent={args.isCurrentLinkB}
			/>
		</RadioBoxLinks>
	);
};

export const PseudoRadioBoxLinks = Template.bind({});
