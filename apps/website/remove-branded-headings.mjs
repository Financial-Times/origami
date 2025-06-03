import fs from 'node:fs/promises';
import {globby} from 'globby';
import {minify} from 'html-minifier';
import {JSDOM} from 'jsdom';

// Get all HTML files from the output directory
const path = 'origami.ft.com';
const files = await globby(`${path}/**/*.html`);

/**
 * Remove links from a table of contents element, where they are
 * to headings which do not exist on the current page.
 *
 * @param {Element[]} tocComponent - The element containing the table of contents.
 * @param {string[]} headingIds - An array of heading IDs which exist on the current page.
 * @returns {number} - A count of removed links to branded headings which do not exist.
 */
function removeLinksToMissingHeadings(tocComponent, headingIds) {
	const items = tocComponent.querySelectorAll('li');
	const extraItems = Array.from(items).filter(item => {
		const anchor = item.querySelector('a');
		if (!anchor) {
			return false;
		}
		const anchorId = anchor.href.replace(/^(.+)#/, '');
		if (anchorId === '_top') {
			return false;
		}
		return !headingIds.includes(anchorId);
	});

	for (const item of extraItems) {
		item.remove();
	}

	return extraItems.length;
}

await Promise.all(
	files.map(async file => {
		let html = await fs.readFile(file, 'utf-8');

		// Get elements which represent a table of contents (toc), with in-page links.
		const dom = new JSDOM(html);
		const tocComponent = dom.window.document.querySelector('starlight-toc');
		const mobileTocComponent = dom.window.document.querySelector(
			'mobile-starlight-toc'
		);

		// Find actual headings on the page. We ignore headings with a
		// higher level than h4, these are unlikely to be within a toc component.
		const headings = dom.window.document.querySelectorAll('h2, h3, h4');
		const headingIds = Array.from(headings).map(heading =>
			heading.getAttribute('id')
		);

		// Nothing to do if there is no toc component, or no headings.
		if ((!tocComponent && !mobileTocComponent) || headingIds.length === 0) {
			return;
		}

		// Remove links to headings which do not exist on the page.
		let removedHeadingCount = 0;
		if (tocComponent) {
			removedHeadingCount += removeLinksToMissingHeadings(
				tocComponent,
				headingIds
			);
		}

		if (mobileTocComponent) {
			removedHeadingCount += removeLinksToMissingHeadings(
				mobileTocComponent,
				headingIds
			);
		}

		removedHeadingCount &&
			console.log(
				`Removed ${removedHeadingCount} links to branded headings from ${file}`
			);

		// Minify the HTML
		html = dom.serialize();
		html = minify(html, {
			removeComments: true,
			preserveLineBreaks: true,
			collapseWhitespace: true,
		});
		await fs.writeFile(file, html);
	})
);
