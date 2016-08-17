import Player from '../../src/js/video';
import Playlist from '../../src/js/playlist';

document.addEventListener("DOMContentLoaded", function() {
	const select = document.querySelector('select');
	const queue = Array.from(select.options).map(opt => opt.value);

	const player = new Player(document.querySelector('[data-o-component="o-video"]'), {
		id: queue[0]
	});

	const playlist = new Playlist({ player, queue });

	const buttons = Array.from(document.querySelectorAll('button')).forEach(button => {
		button.onclick = function () {
			playlist[this.name]()
		};
	});

	player.containerEl.addEventListener('play', () => {
		select.options[playlist.currentIndex].selected = true;
	}, true);
});
