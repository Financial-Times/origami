import CookieMessage from './../../main.js';

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

document.addEventListener('oCookieMessage.ready', function() {
	document.querySelector('[data-o-component="o-cookie-message-close"]').removeEventListener('click', CookieMessage.flagUserAsConsentingToCookies);
	document.querySelector('[data-o-component="o-cookie-message-close"]').addEventListener('click', showNotification);
});

function showNotification(){
	const userNotice =`
	<div class="o-cookie-message__container">
		<p class="o-cookie-message__description">
			<strong>Hello!</strong> normally, clicking that button will hide the cookie message for 3 months. But that would mean you wouldn't be able to see this demo anymore, which might be quite annoying. You can refresh the page to get the proper cookie message back.
		</p>
	</div>`;
	const CookieMessageEl = document.querySelector('[data-o-component="o-cookie-message"]');
	CookieMessageEl.innerHTML = userNotice;
}
