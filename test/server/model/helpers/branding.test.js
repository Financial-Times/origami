const should = require('chai').should();
const getBranding = require('../../../../server/model/helpers/branding');
const brand = {
	predicate: 'http://www.ft.com/ontology/classification/isClassifiedBy',
	id: 'brand-id',
	types: [
		'http://www.ft.com/ontology/product/Brand'
	],
	directType: 'http://www.ft.com/ontology/product/Brand'
};
const columnist = {
	predicate: 'http://www.ft.com/ontology/annotation/hasAuthor',
	id: 'brand-id',
	types: [
		'http://www.ft.com/ontology/person/Person'
	],
	directType: 'http://www.ft.com/ontology/person/Person',
	attributes: []
};

const columnistHasHeadshot = {
	predicate: 'http://www.ft.com/ontology/annotation/hasAuthor',
	id: 'brand-id',
	types: [
		'http://www.ft.com/ontology/person/Person'
	],
	directType: 'http://www.ft.com/ontology/person/Person',
	attributes: [{
		key: 'headshot',
		value: 'fthead:john-gapper'
	}]
};

const arbitraryConcept = {
	predicate: 'http://www.ft.com/ontology/classification/isClassifiedBy',
	id: 'concept-id',
	types: [
		'http://www.ft.com/ontology/Genre'
	],
	directType: 'http://www.ft.com/ontology/Genre'
};

const commentConcept = {
	predicate: 'http://www.ft.com/ontology/classification/isClassifiedBy',
	id: 'concept-id',
	types: [
		'http://www.ft.com/ontology/Genre'
	],
	prefLabel: 'Comment',
	id: 'e569e23b-0c3e-3d20-8ed0-4c17b8177c05',
	directType: 'http://www.ft.com/ontology/Genre'
};

describe('Branding', function () {
	it('should set branding to the article brand if present', function () {
		getBranding([ brand, arbitraryConcept ]).should.eql(brand);
	});

	it('should set branding to the article columnist if present on comment article', function () {
		getBranding([ columnist, commentConcept ]).should.eql(columnist);
	});

	it('should set branding to the brand if both brand (not equal to author) and columnist are present', function () {
		getBranding([ columnist, brand ]).should.eql(brand);
	});

	it('should set a headshot to the branding if a columnist and has hasHeadshot attribute', function () {
		getBranding([ columnistHasHeadshot, commentConcept ]).should.eql(columnistHasHeadshot);
	});

	it('should return null if no brand or columnist is present', function () {
		should.not.exist(getBranding([arbitraryConcept, commentConcept]));
	});

	it('should return null if there is more than one author', () => {
		should.not.exist(getBranding([ columnist, columnistHasHeadshot, commentConcept ]));
	});

	it('should not set branding to the article columnist if present on non comment article', function () {
		should.not.exist(getBranding([ columnist, arbitraryConcept ]));
	});
});
