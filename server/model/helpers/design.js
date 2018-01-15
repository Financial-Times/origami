const _ = require('lodash');

const isBrandSpecialReport = (
	content => content.annotations.some(
		concept => concept.id === '0c9a33dd-55db-4cd2-ab9a-ce287ed82172'
	)
);

function setDesignProperties (content) {

	// set the default values in case they're not defined
	_.defaultsDeep(content, { design: {theme: 'basic', layout: 'default'} });

	if (content.type === 'package') {
		if (isBrandSpecialReport(content)) {
			content.design.theme = 'special-report';
		}
		// } else { no rules for other things yet }
	}

	// note that it's possible for a package to be containedIn another package
	if (content.package) {
		setDesignProperties(content.package);
		if (isBrandSpecialReport(content.package)) {
			content.design.theme = 'special-report';
		} else {
			content.design.theme = content.package.design.theme;
		}
	}

	return content;
}

module.exports = setDesignProperties;
