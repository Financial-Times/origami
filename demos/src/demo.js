/*global OrigamiRegistry*/
function loadDemo(showtype) {
	const palette = {};
	const roles = ['border', 'background', 'text', 'all'];
	const el = document.getElementById('results');
	const paletteExclusions = ['transparent', 'inherit'];

	getData('palette');

	function getData(type) {
		const oReq = new XMLHttpRequest();

		// Gets the module and version from the url
		const module = location.pathname.match(/o-colors(.*?)(?=\/)/g);
		const reqUrl = 'https://origami-build.ft.com/v2/files/';
		oReq.open('GET', ((location.pathname.indexOf('/local') !== -1) ? '../..' : reqUrl + module[0]) + '/src/scss/_' + type + '.scss', true);

		oReq.onload = function() {
			const src = this.responseText;

			// Extract the data
			let m = src.match(/\$[\w\-]+\:\s*(?:map\-merge\()?\(\s*\n([^;]+);/);

			// Split into lines
			m[1].split('\n').forEach(function(rule) {
				// Remove comments, quotes, leading and trailing whitespace (and trailing commas)
				rule = rule.replace(/\/*[\s\S]*?\*\//g, '').replace(/\/\/.*/, '');
				rule = rule.replace(/^\s+/, '').replace(/[,\s]+$/, '');
				rule = rule.replace(/"/g, '').replace(/'/g, '');

				if (type === 'palette') {
					m = rule.split(/\s*:\s*/);

					if (m && m.length === 2) {
						if (m[0] in palette) { return true; } // Don't output the color if it already has been

						palette[m[0]] = m[1];

						if (showtype === 'palette' && paletteExclusions.indexOf(m[1]) === -1) {
							el.innerHTML += '<div data-o-grid-colspan="12 M6 L3" class="demo-sample">' +
								'<div class="demo-swatch o-colors-palette-'+m[0]+'" title="' + rule + '"></div>' +
									'<span class="demo-name">'+m[0]+'</span>' +
									'<span class="demo-descrip">'+m[1]+'</span>' +
								'</div>';
						}
					}
				} else {
					m = rule.match(/^([^\:]+)\:\s*\(([^\)]+)\)/);
					if (m) {
						if (m[2].match(/_deprecated\s*:/)) return true;
						let op = '<div data-o-grid-colspan="12 M6 L3" class="demo-sample"><div class="demo-swatch';
						const tips = [];
						roles.forEach(function(role) {
							const rolematch = (new RegExp(role+'\\s*:\\s*([\\w-]+),')).exec(m[2]+',');
							if (rolematch) {
								op += ' o-colors-'+m[1]+'-'+role;
								tips.push(role+': '+rolematch[1]);
							}
						});
						op += '" title="'+tips.join(', ')+'"></div><span class="demo-name">'+m[1]+'</span></div>';
						el.innerHTML += op;
					}
				}
			});
			if (type === 'palette' && showtype === 'use-cases') {
				return getData(showtype);
			}
			if (typeof OrigamiRegistry !== 'undefined') {
				window.addEventListener('resize', OrigamiRegistry.resize, false);
				OrigamiRegistry.resize();
			}
		};
		oReq.send();
	}
}

window.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById('results')) {
		loadDemo(document.getElementById('results').getAttribute('data-demo'));
	}
}, false);
