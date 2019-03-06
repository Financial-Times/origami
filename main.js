import oOverlay from './src/js/overlay';
const constructAll = function() {
	oOverlay.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
export default oOverlay;
export { oOverlay };
