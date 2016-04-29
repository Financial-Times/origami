'use strict'; //eslint-disable-line

const gulp = require('gulp');
const fs = require('fs');
const deprecatedIcons = require('./_deprecated.js');

// Read svg directory for list of icons to pass to demo template
const files = fs.readdirSync('svg').filter((file) => {
	// File is an SVG and not deprecated
	return file.indexOf(".svg") > -1 && deprecatedIcons.indexOf(file.slice(0, -4)) === -1;
}).map((file) => {
	// Removes .svg extension
	return file.slice(0, -4);
});

gulp.task('demoConfig', () => {
	const icons = files.map((file) => {
		return { name: file };
	});

	fs.writeFileSync('demos/src/data.json', JSON.stringify({ icons: icons }, null, '\t'), { encoding: 'utf-8' });
});

gulp.task('svgSassList', () => {
	const iconList = `$o-icons-list: (${files.toString()});\n`;
	fs.writeFileSync('scss/_icon-list.scss', iconList, { encoding: 'utf-8' });
});

gulp.task('default', ['demoConfig', 'svgSassList']);
