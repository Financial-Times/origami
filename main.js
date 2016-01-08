import search from './src/js/search';
import preventScroll from './src/js/prevent-scroll';
import toggle from './src/js/toggle';
import selected from './src/js/selected';
import editionSwitcher from './src/js/edition-switcher';

const init = flags => {
	search.init(flags);
	preventScroll.init();
	toggle.init(flags);
	selected.init(flags);
	editionSwitcher.init(document.querySelector('.edition-switcher'), flags);
};

export default {
	init
};
