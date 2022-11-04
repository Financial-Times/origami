import Expander from "./src/js/expander.js";

const constructAll = function () {
	Expander.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default Expander;
