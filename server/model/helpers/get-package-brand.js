const SPECIAL_REPORT = 'd169843c-255c-3caa-9eab-68bc10777132';
const FT_SERIES = 'fb491676-5024-3111-a959-1fbce2fbecc1';

module.exports = (annotations) => {

	if(!annotations) {
		return;
	}

	const brand = annotations.find(tag => [SPECIAL_REPORT, FT_SERIES].includes(tag.id));

	if(brand) {
		return Object.assign({
			inSentence: brand.id === FT_SERIES ? 'series' : brand.prefLabel
		}, brand);
	} else {
		return {
			inSentence: 'series'
		};
	}
};
