import oGrid from '@financial-times/o-grid';
import oViewport from '@financial-times/o-viewport';

export default function init (callback) {
	oViewport.listenTo('resize');

	let lastBreakpoint = oGrid.getCurrentLayout();

	document.body.addEventListener('oViewport.resize', () => {
		const breakpoint = oGrid.getCurrentLayout();

		if (breakpoint !== lastBreakpoint) {
			callback(breakpoint);
			lastBreakpoint = breakpoint;
		}
	});

	callback(lastBreakpoint);
}
