const { Teaser } = require('../');

exports.component = Teaser;

exports.package = require('../package.json');

exports.dependencies = {
	'o-date': '^4.0.0',
	'o-labels': '^5.0.0',
	'o-normalise': '^2.0.0',
	'o-teaser': '^4.0.0',
	'o-typography': '^6.0.0',
	'o-video': '^6.0.0'
};

exports.stories = [
	require('./article'),
	require('./podcast'),
	require('./opinion'),
	require('./content-package'),
	require('./package-item'),
	require('./promoted'),
	require('./top-story'),
	require('./video')
];

exports.knobs = require('./knobs');
