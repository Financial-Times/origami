import oLayout from "./src/js/layout.js";

const constructAll = function () {
	oLayout.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default oLayout;
