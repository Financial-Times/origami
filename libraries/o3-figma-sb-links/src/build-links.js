import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const figmaLinks = JSON.parse(fs.readFileSync(__dirname + '/figma-links.json'));
const sbLinks = JSON.parse(fs.readFileSync(__dirname + '/sb-links.json'));
const linksJson = JSON.parse(fs.readFileSync(__dirname + '/links.json'));
const figmaLinkIds = Object.keys(figmaLinks);
const sbLinkIds = Object.keys(sbLinks);

function buildLinks() {
	figmaLinkIds.forEach(id => {
		if (!linksJson[id]) {
			linksJson[id] = {};
		}
		const convertedFigmaLink = convertFigmaStringsToEmbedStrings(figmaLinks[id]);
		if (figmaLinks[id]) {
			if (!linksJson[id].figma) {
				linksJson[id].figma = convertedFigmaLink;
			} else if (linksJson[id].figma !== convertedFigmaLink) {
				linksJson[id].figma = convertedFigmaLink;
			}
		} else if (linksJson[id].figma && !figmaLinks[id]) {
			linksJson[id].figma = '';
		}
	});

	sbLinkIds.forEach(id => {
		if (!linksJson[id]) {
			linksJson[id] = {};
		}
		if (!linksJson[id].sb) {
			linksJson[id].sb = sbLinks[id];
		}
	});

	// oder the links by id

	const orderedLinks = {};

	Object.keys(linksJson)
		.sort()
		.forEach(key => {
			orderedLinks[key] = linksJson[key];
		});

	fs.writeFileSync(
		__dirname + '/links.json',
		JSON.stringify(orderedLinks, null, 2)
	);
}

function convertFigmaStringsToEmbedStrings(str) {
	return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
		str
	)}`;
}

buildLinks();
