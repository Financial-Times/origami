import {Header} from './header';
import {MegaMenu} from './megaMenu';
import {HeaderProps} from './Props';
import {Drawer} from './drawer';
export function OHeader({
	top,
	nav,
	search,
	anon,
	sticky,
	simple,
	transparent,
	megamenu,
	drawer,
}: HeaderProps) {

	if (megamenu) {
		return nav && <MegaMenu {...nav}/>;
	}

	return (
		<>
			<Header {...nav} />
			<Drawer />
		</>
	);
}
