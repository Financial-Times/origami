/*global exports*/

function wrapElement(targetEl, wrapEl) {
	const parentEl = targetEl.parentNode;
	parentEl.insertBefore(wrapEl, targetEl);
	wrapEl.appendChild(targetEl);
}

function wrap(tableSelector, wrapClass) {
	tableSelector = typeof tableSelector === "string" ? tableSelector : ".o-table";
	wrapClass = typeof wrapClass === "string" ? wrapClass : "o-table-wrapper";

	const matchingEls = document.querySelectorAll(tableSelector);
	let wrapEl;

	if (matchingEls.length > 0) {
		wrapEl = document.createElement('div');
		wrapEl.setAttribute("class", wrapClass);

		for (let c = 0, l = matchingEls.length; c < l; c++) {
			const tableEl = matchingEls[c];

			if (!tableEl.parentNode.matches("." + wrapClass)) {
				wrapElement(tableEl, wrapEl.cloneNode(false));
			}
		}
	}
}

exports.wrap = wrap;
