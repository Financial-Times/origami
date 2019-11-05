'use strict'; // eslint-disable-line

const readFile = require('fs').readFileSync;
const writeFile = require('fs').writeFileSync;
const iconBlacklist = [
	'mute_notifications' // incorrect name, only include mute-notifications (with a dash)
];

runScript();

function runScript() {
	let {images} = loadJson(`${__dirname}/../bower_components/fticons/imageset.json`);
	images = images.filter(image => !iconBlacklist.includes(image.name));
	writeDemoData(images, `${__dirname}/../demos/src/data.json`);
	writeSassIconList(images, `${__dirname}/../src/scss/_icon-list.scss`);
}

function loadJson(filePath) {
	return JSON.parse(readFile(filePath, 'utf-8'));
}

function writeDemoData(images, filePath) {
	const icons = images.map(simplifyImageForDemoData);
	writeFile(filePath, JSON.stringify({icons}, null, '\t'));
}

function simplifyImageForDemoData(image) {
	return {
		name: image.name
	};
}

function writeSassIconList(images, filePath) {
	const iconNames = images.map(image => image.name);
	const paddedIconNames = iconNames.map(name => `\t${name}`);
	const sass = `$o-icons-list: (\n${paddedIconNames.join(',\n')}\n);\n`;
	writeFile(filePath, sass);
}
