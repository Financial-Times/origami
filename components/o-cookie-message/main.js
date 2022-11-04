import CookieMessage from "./src/js/cookie-message.js";

function constructAll() {
	CookieMessage.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
}

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default CookieMessage;
