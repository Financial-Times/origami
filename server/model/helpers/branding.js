/*eslint strict:0*/
'use strict';

const HEADSHOT_PREFIX = 'https://www.ft.com/__origami/service/image/v2/images/raw/';

function isABrand (annotations) {
	return annotations.find(annotation => annotation.types && annotation.types.includes('http://www.ft.com/ontology/product/Brand'));
}

// COMPLEX: This will only return an author if there is one author, for articles with
// more than one author don't pick one randomly because it might upset the other(s).
function isAnAuthor (annotations) {
	const authors = annotations.filter(annotation => annotation.predicate === 'http://www.ft.com/ontology/annotation/hasAuthor');
	if (authors.length === 1) {
		return authors[0];
	}
}

function isGenreComment (annotations) {
	return annotations.find(annotation =>
		annotation.types && annotation.types.includes('http://www.ft.com/ontology/Genre') &&
		annotation.id === 'e569e23b-0c3e-3d20-8ed0-4c17b8177c05'
	);
}

function getHeadshotFileName (tag) {
	const headshot = tag.attributes && tag.attributes.find(attr => attr.key === 'headshot');
	return headshot && headshot.value;
}

module.exports = function (annotations) {
	let tag = isABrand(annotations);
	const author = isAnAuthor(annotations);
	if (author && isGenreComment(annotations)) {
		const headshotFileName = getHeadshotFileName(author);
		if (!tag) {
			tag = author;
		}

		if (headshotFileName) {
			tag.headshot = HEADSHOT_PREFIX + headshotFileName;
			tag.headshotAltText = `picture of the author ${author.prefLabel}`;
		}
	}
	return tag || null;
};
