const expect = require('chai').expect;
const setDesign = require('../../../../server/model/helpers/design');

const brandSpecialReportConcept = {
	apiUrl: 'http://api.ft.com/brands/0c9a33dd-55db-4cd2-ab9a-ce287ed82172',
	directType: 'http://www.ft.com/ontology/product/Brand',
	id: '0c9a33dd-55db-4cd2-ab9a-ce287ed82172',
	predicate: 'http://www.ft.com/ontology/classification/isClassifiedBy',
	prefLabel: 'Special Report',
};

const specialReportPackage = {
	type: 'package',
	design: { theme: 'basic', layout: 'default' },
	annotations: [
		brandSpecialReportConcept
	]
};

const extraThemePackage = {
	type: 'package',
	design: { theme: 'extra', layout: 'default' },
	annotations: []
};

describe('Design', function () {
	it('should set default values if design is not defined', function () {
		expect(setDesign({}).design).to.deep.equal({theme: 'basic', layout: 'default'});
	});

	it('should set default theme if not defined', function () {
		expect(setDesign({design: {layout: 'something'}}).design).to.deep.equal({theme: 'basic', layout: 'something'});
	});

	it('should set default layout if not defined', function () {
		expect(setDesign({design: {theme: 'basic'}}).design).to.deep.equal({theme: 'basic', layout: 'default'});
	});

	it('should have it\'s theme defined by metadata if it\'s a Special Report package', function () {
		expect(setDesign(specialReportPackage).design.theme).to.equal('special-report');
	});

	it('should inherit design theme from it\'s parent package', function () {
		const fixture = {
			type: 'article',
			design: { theme: 'basic', layout: 'default' },
			package: extraThemePackage,
			annotations: []
		};
		expect(setDesign(fixture).design.theme).to.equal('extra');
	});

	it('should inherit design "special-report" theme from package with Special Report brand metadata', function () {
		const fixture = {
			type: 'article',
			design: { theme: 'basic', layout: 'default' },
			package: specialReportPackage,
			annotations: []
		};
		expect(setDesign(fixture).design.theme).to.equal('special-report');
	});
});
