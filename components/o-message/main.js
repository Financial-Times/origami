import Message from "./src/js/message.js";

const constructAll = () => {
	Message.init();
	document.removeEventListener("o.DOMContentLoaded", constructAll);
};

if (typeof document !== "undefined") {
	document.addEventListener("o.DOMContentLoaded", constructAll);
}

export default Message;
