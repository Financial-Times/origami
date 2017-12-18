const expect = require('chai').expect;
const podcastMainImageHtml = require('../../../../server/model/helpers/podcast-main-image');
const mainImage = {
	title: 'This is the title',
	description: '',
	url: 'http://image.jpg',
	width: 394,
	height: 394
};

describe('Podcast Main Image', () => {

	const validImageHtml =
		'<figure class="n-content-image n-content-image--center" style="width: 394px; max-width: 100%;">' +
			'<div class="n-image-wrapper n-image-wrapper--placeholder" style="padding-bottom: 100%;">' +
				'<img alt="" class="n-image" role="presentation" srcset="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fimage.jpg?source=next&fit=scale-down&width=394 394w" sizes="(min-width: 46.25em) 394px, calc(100vw - 20px)">' +
			'</div>' +
		'</figure>';

	it('returns the html for the podcast main image', () => {
		expect(podcastMainImageHtml(mainImage)).to.equal(validImageHtml);
	});

});
