const region = document.querySelector('.demo');
const toggle = document.querySelector('.demo-toggle');
const loader = document.querySelector('.o-loading');

if (toggle && loader) {
	toggle.addEventListener('click', function () {
		toggle.disabled = true;
		toggle.classList.add('demo-on');

		region.setAttribute('aria-busy', 'true');

		setTimeout(function () {
			toggle.disabled = false;
			toggle.classList.remove('demo-on');

			region.setAttribute('aria-busy', 'false');
		}, 5000);
	});
}
