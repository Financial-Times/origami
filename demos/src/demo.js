import OVideo from '../../src/js/video';

document.addEventListener("DOMContentLoaded", function() {
	const video = new OVideo(document.querySelector('[data-o-component="o-video"]'));

	const select = document.querySelector('select');

	if (select) {
		select.addEventListener('change', function () {
			video.update({ id: this.value });
		});

		select.value = video.opts.id;
	}
});
