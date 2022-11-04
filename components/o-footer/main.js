import Footer from "./src/js/footer.js";

const constructAll = () => {
	Footer.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default Footer;
