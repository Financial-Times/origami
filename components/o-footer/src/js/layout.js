import {oPrivateGrid} from '@financial-times/o-private-foundation/main.js';
import oViewport from '@financial-times/o-viewport';

export default function init (callback) {
	oViewport.listenTo('resize');

	let lastBreakpoint = oPrivateGrid.getCurrentLayout();

	document.body.addEventListener('oViewport.resize', () => {
		const breakpoint = oPrivateGrid.getCurrentLayout();

		if (breakpoint !== lastBreakpoint) {
			callback(breakpoint);
			lastBreakpoint = breakpoint;
		}
	});

	callback(lastBreakpoint);
}
