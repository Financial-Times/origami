const expect = require('chai').expect;
const getPackageBrand = require('../../../../server/model/helpers/get-package-brand');

const SPECIAL_REPORT = { id: 'd169843c-255c-3caa-9eab-68bc10777132', prefLabel: 'Special Report' };
const FT_SERIES = { id: 'fb491676-5024-3111-a959-1fbce2fbecc1', prefLabel: 'FT Series' };
const FT_GUIDES = { id: '20c0292e-f3bc-347d-bc42-75bbd69c9be7', prefLabel: 'FT Guides' };
const FT_COLLECTIONS = { id: '67c4c8c8-8ae3-3c7a-9316-97cd76ab2d81', prefLabel: 'FT Collections' };
const FT_BEST_OF = { id: '24d273e3-1c59-3d2a-9a31-07d9db66ba7c', prefLabel: 'FT Best of' };

describe('Package branding', () => {

	it('identifies a special report', () => {
		const brand = getPackageBrand([{id: 'something'}, SPECIAL_REPORT]);

		expect(brand.prefLabel).to.equal('Special Report');
		expect(brand.inSentence).to.equal('Special Report');
	});

	it('identifies an FT series', () => {
		const brand = getPackageBrand([{id: 'something'}, FT_SERIES, { id: 'something else' }]);

		expect(brand.prefLabel).to.equal('FT Series');
		expect(brand.inSentence).to.equal('series');
	});

	it('identifies an FT guides', () => {
		const brand = getPackageBrand([{id: 'something'}, FT_GUIDES, { id: 'something else' }]);

		expect(brand.prefLabel).to.equal('FT Guides');
		expect(brand.inSentence).to.equal('series');
	});

	it('identifies an FT collections', () => {
		const brand = getPackageBrand([{id: 'something'}, FT_COLLECTIONS, { id: 'something else' }]);

		expect(brand.prefLabel).to.equal('FT Collections');
		expect(brand.inSentence).to.equal('series');
	});

	it('identifies an FT best of', () => {
		const brand = getPackageBrand([{id: 'something'}, FT_BEST_OF, { id: 'something else' }]);

		expect(brand.prefLabel).to.equal('FT Best of');
		expect(brand.inSentence).to.equal('series');
	});

	it('takes the first one, if it is both a series and special report', () => {
		const packageBrands = [ FT_SERIES, FT_GUIDES, FT_COLLECTIONS, FT_BEST_OF ];
		packageBrands.forEach(targetBrand => {
			const brand = getPackageBrand([{id: 'something'}, targetBrand, SPECIAL_REPORT]);

			expect(brand.prefLabel).to.equal(targetBrand.prefLabel);
			expect(brand.inSentence).to.equal('series');
		});
	});

	it('other things dont have a package brand', () => {
		const brand = getPackageBrand([{id: 'something'}]);

		expect(brand).to.eql({
			inSentence: 'series'
		});
	});

});
