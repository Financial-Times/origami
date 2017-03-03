'use strict'; //eslint-disable-line

const fs = require('fs');

function createSassList() {
	// Read the list of icons from imageList.json
	fs.readFile('bower_components/fticons/imageList.json', 'utf8', (err, data) => {
		fs.writeFileSync('demos/src/data.json', data, { encoding: 'utf-8' });

		const imageNames = JSON.parse(data);
		let names = imageNames["images"].map((icon)=> {
			return icon.name;
		});

		// Create a Sass list and write it to the scss folder
		const iconList = `$o-icons-list: (\n${names.join(',\n')}\n);\n`;
		fs.writeFileSync('scss/_icon-list.scss', iconList, { encoding: 'utf-8' });
	});
}

createSassList();
