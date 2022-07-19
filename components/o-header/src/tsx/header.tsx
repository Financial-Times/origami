import {Header} from './header-primary';
import {MegaMenu} from './mega-menu';
import {HeaderProps} from './Props';
import {Subnav} from './subnav';

export function OHeader({
	currentNav,
	top,
	nav,
	search,
	subnav,
	anon,
	sticky,
	simple,
	transparent,
	megamenu,
	drawer,
	type,
}: HeaderProps) {
	console.log({
		props: {
			type,
			top,
			nav,
			search,
			subnav,
			currentNav,
			anon,
			sticky,
			simple,
			transparent,
			megamenu,
			drawer,
		},
	});

	const typeMapping = {
		primary: nav && drawer ? <Header {...nav} drawer={drawer} /> : null,
		megamenu: nav ? <MegaMenu {...nav} /> : null,
		subnav:
			nav && currentNav ? <Subnav {...nav} currentNav={currentNav} /> : null,
	};

	return typeMapping[type];
}
