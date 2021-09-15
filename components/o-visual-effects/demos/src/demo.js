const toggle = document.querySelector('.demo-toggle');
const canvas = document.querySelector('.demo-canvas');

if (toggle && canvas) {
	toggle.addEventListener('click', function () {
		const classes = ['demo-on', 'demo-off'];
		const status = canvas.classList.contains(classes[0]);

		canvas.classList.add(classes[Number(status)]);
		canvas.classList.remove(classes[Number(!status)]);

		toggle.disabled = true;

		setTimeout(function () {
			toggle.disabled = false;
		}, 500);
	});
}
