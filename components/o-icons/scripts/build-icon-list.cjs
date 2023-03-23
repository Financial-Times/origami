"use strict"; // eslint-disable-line

const icons = require("./imageset.cjs");
const writeFile = require("fs").writeFileSync;
const iconBlacklist = [
	"mute_notifications", // incorrect name, only include mute-notifications (with a dash)
];

runScript();

function runScript() {
	const iconName = process.argv[2];
	const deleteIconName = process.argv[3] === "remove";
	if (deleteIconName) {
		deleteIcon(iconName, icons);
	} else {
		addIcon(iconName, icons);
	}

	writeCjsModule(icons, `${__dirname}/imageset.cjs`);

	const filteredIcons = icons.filter(icon => !iconBlacklist.includes(icon));
	writeDemoData(filteredIcons, `${__dirname}/../demos/src/data.json`);
	writeSassIconList(filteredIcons, `${__dirname}/../src/scss/_icon-list.scss`);
	writeTsInterface(filteredIcons, `${__dirname}/../src/tsx/data.ts`);
}

function writeDemoData(icons, filePath) {
	writeFile(filePath, JSON.stringify({icons}, null, "\t"));
}


function writeCjsModule(icons, filePath) {
	const cjs = `module.exports = ${JSON.stringify(icons)};\n`;
	writeFile(filePath, cjs);
}

function writeSassIconList(icons, filePath) {
	const paddedIconNames = icons.map(name => `\t${name}`);
	const sass = `$o-icons-list: (\n${paddedIconNames.join(",\n")}\n);\n`;
	writeFile(filePath, sass);
}

function writeTsInterface(icons, filePath) {
	const ts = `export const icons = [\n\t'${icons.join(
		"',\n\t'"
	)}',\n] as const;\n\nexport type IconName = typeof icons[number];\n`;
	writeFile(filePath, ts);
}

function deleteIcon(name, array) {
	const index = array.indexOf(name);
	if (index > -1) {
		array.splice(index, 1);
	}
}

function addIcon(name, array) {
	// if the icon already exists, don't add it again
	if (array.includes(name)) {
		return;
	}
	// insert in alphabetical order
	const index = array.findIndex(icon => icon > name);

	if (index > -1) {
		array.splice(index, 0, name);
	} else {
		array.push(name);
	}
}
