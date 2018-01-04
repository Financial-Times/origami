const OLD_SPECIAL_REPORT = 'd169843c-255c-3caa-9eab-68bc10777132'; //migration
const SPECIAL_REPORT = '0c9a33dd-55db-4cd2-ab9a-ce287ed82172';
const FT_SERIES = 'fb491676-5024-3111-a959-1fbce2fbecc1';
const FT_GUIDES = '20c0292e-f3bc-347d-bc42-75bbd69c9be7';
const FT_COLLECTIONS = '67c4c8c8-8ae3-3c7a-9316-97cd76ab2d81';
const FT_BEST_OF = '24d273e3-1c59-3d2a-9a31-07d9db66ba7c';


module.exports = (annotations) => {

	if(!annotations) {
		return;
	}

	const packageBrandIds = [
		FT_SERIES,
		FT_GUIDES,
		FT_COLLECTIONS,
		FT_BEST_OF
	];
	const targetIds = packageBrandIds.concat([ SPECIAL_REPORT, OLD_SPECIAL_REPORT ]);
	const brand = annotations.find(tag => targetIds.includes(tag.id));

	if(brand) {
		return Object.assign({
			inSentence: packageBrandIds.includes(brand.id) ? 'series' : brand.prefLabel
		}, brand);
	} else {
		return {
			inSentence: 'series'
		};
	}
};
