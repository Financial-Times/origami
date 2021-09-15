'use strict';

const Listr = require('listr');
const ListrRenderer = require('../helpers/listr-renderer');
const path = require('path');
const {readFile} = require('fs/promises');
const buildDemo = require('./demo-build');

module.exports = function (cfg) {
	cfg = cfg || {};
	const config = cfg.flags || {};
	config.cwd = config.cwd || process.cwd();

	return new Listr([{
		title: 'Compiling Demos',
		task: () => {
			return buildDemo(config);
		},
		skip: async () => {
			const configPath = path.join(config.cwd, 'origami.json');
			try {
				const file = await readFile(configPath);
				let demosConfig;
				try {
					demosConfig = JSON.parse(file);
				} catch (error) {
					return `${configPath} is not valid JSON.`;
				}

				if (!Array.isArray(demosConfig.demos) || demosConfig.demos.length < 1) {
					return 'No demos exist in the origami.json file. Reference https://origami.ft.com/docs/manifests/origami-json/ to configure demos in the component\'s origami.json manifest file.';
				}

				let demoFilters;
				if (config && typeof config.demoFilter === 'string') {
					demoFilters = config.demoFilter.split(',');
				} else if (config && Array.isArray(config.demoFilter)) {
					demoFilters = config.demoFilter;
				}

				if (demoFilters) {
					const demoNames = demosConfig.demos.map(demo => demo.name);
					const noDemosMatchFilter = demoNames.every(name => !demoFilters.includes(name));
					if (noDemosMatchFilter) {
						if (demoFilters.length === 1) {
							return 'No demos matched the given filter. Filter given was ' + demoFilters[0];
						} else {
							return 'No demos matched the given filters. Filters given were ' + demoFilters.join(', ');
						}
					}
				}

				return false;
			} catch(e) {
				return `No origami.json file found at ${configPath}`;
			}
		}
	}], {
		renderer: ListrRenderer,
		collapse: false,
		showSubtasks: true,
		concurrent: true
	})
		.run();
};

module.exports.watchable = true;
