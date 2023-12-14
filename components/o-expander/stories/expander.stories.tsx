import {Expander} from '../src/tsx/expander';
import javascript from '../main.js';
import './expander.scss';
import {useEffect} from 'react';

export default {
	title: 'Components/o-expander',
	component: Expander,
	parameters: {
		html: {},
	},
	args: {},
};

const Template = ({children, ...args}) => {
	useEffect(() => void javascript.init(), []);
	return (
		<Expander {...args} header={<h3>This content has further details</h3>}>
			<p>wow bet you didn't expect details like this!!</p>
			<ul>
				<li>one</li>
				<li>two</li>
				<li>three</li>
				<li>four</li>
			</ul>
		</Expander>
	);
};

const Example = Template.bind({});
Example.args = {
	expanded: false,
};

export {Example as Expander};
