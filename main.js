import { Tracking } from './src/javascript/tracking';

const tracking = new Tracking();
const link = tracking.link;
const boundInit = tracking.init.bind(tracking);
const boundPage = tracking.page.bind(tracking);
const boundEvent = tracking.event.bind(tracking);
const boundUpdateConfig = tracking.updateConfig.bind(tracking);

function initialise() {
	tracking.init();
	document.removeEventListener('o.DOMContentLoaded', initialise);
}

// Try and initialise on o.DOMContentLoaded. If it fails, defer to the
// consumer of the library.
document.addEventListener('o.DOMContentLoaded', initialise);

/**
 * A constructed object, this module is a Singleton as we only want one
 * instance sending events. See {@link Tracking} for the publicly available
 * interface.
 * @type {Tracking}
 */
export default tracking;
export {
	tracking,
	link,
	boundInit as init,
	boundPage as page,
	boundEvent as event,
	boundUpdateConfig as updateConfig
};
