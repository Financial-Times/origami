import SteppedProgress from "./src/js/stepped-progress.js";

const constructAll = function () {
	SteppedProgress.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default SteppedProgress;
