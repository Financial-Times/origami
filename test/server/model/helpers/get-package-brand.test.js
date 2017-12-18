const expect = require('chai').expect;
const getPackageBrand = require('../../../../server/model/helpers/get-package-brand');

const SPECIAL_REPORT = 'd169843c-255c-3caa-9eab-68bc10777132';
const FT_SERIES = 'fb491676-5024-3111-a959-1fbce2fbecc1';


describe('Package branding', () => {

	if('identifies a special report', () => {
		const brand = getPackageBrand([{id: 'something'}, { id: SPECIAL_REPORT, prefLabel: 'Special Report' }]);

		expect(brand.prefLabel).to.equal('Special Report');
		expect(brand.inSentence).to.equal('Special Report');
	});

	it('identifies an FT series', () => {

		const brand = getPackageBrand([{id: 'something'}, { id: FT_SERIES, prefLabel: 'FT Series' }, { id: 'something else' }]);

		expect(brand.prefLabel).to.equal('FT Series');
		expect(brand.inSentence).to.equal('series');
	});

	it('takes the first one, if it is both a series and special report', () => {

		const brand = getPackageBrand([{id: 'something'}, { id: FT_SERIES, prefLabel: 'FT Series' }, { id: SPECIAL_REPORT, prefLabel: 'Special Report' }]);

		expect(brand.prefLabel).to.equal('FT Series');
		expect(brand.inSentence).to.equal('series');
	});

	it('other things dont have a package brand', () => {

		const brand = getPackageBrand([{id: 'something'}]);

		expect(brand).to.eql({
			inSentence: 'series'
		});
	});

});
