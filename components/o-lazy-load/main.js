import LazyLoad from "./src/js/o-lazy-load.js";

const constructAll = function () {
	LazyLoad.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default LazyLoad;
