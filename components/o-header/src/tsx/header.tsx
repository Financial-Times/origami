import {Header} from './header-primary';
import {MegaMenu} from './mega-menu';
import {HeaderProps} from './Props';
import {Subnav} from './subnav';
import {LogoOnlyHeader} from './logo-only';
import {SimpleHeader} from './simple-header';

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
		'logo-only': <LogoOnlyHeader />,
		simple: drawer ? <SimpleHeader drawer={drawer} /> : null,
	};

	return typeMapping[type];
}

export function MainHeader(props: HeaderProps) {
	return <Header {...props.nav} drawer={props.drawer} />;
}


export function MegaMenuHeader(props:HeaderProps) {
 return <MegaMenu {...props.nav} />;
}
