import {Expander} from '../src/tsx/expander';
import javascript from '../main.js';
import './expander.scss';
import {useEffect} from 'react';

export const NestedExpander = ({children, ...args}) => {
	useEffect(() => void javascript.init(), []);
	return (
		<Expander {...args} header={<h3>First Expander</h3>}>
			<p>Details of first expander</p>
			<ul>
				<li>one</li>
				<li>two</li>
				<li>three</li>
				<li>four</li>
			</ul>
			<button className="o-expander__toggle">Secondary toggler button first expander</button>
			<div className="innerExpanderItem">
				<Expander {...args} header={<h3>Second Expander</h3>}>
				<p>Second expander details</p>
				<ul>
					<li>ten</li>
					<li>eleven</li>
					<li>twelve</li>
					<li>thirteen</li>
				</ul>
			</Expander>
			</div>
		</Expander>
	);
};

export default {
	title: 'Components/o-expander/nested',
	component: NestedExpander,
	parameters: {
		html: {},
	},
	args: {

	},
};




