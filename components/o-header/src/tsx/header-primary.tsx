import {NavMobile, NavDesktop} from './nav';
import {DrawerProps, NavItem, NavDesktopItem} from './Props';
import {Drawer} from './drawer';
import {Search} from './search';
import {Anon} from './anon';
import {Top} from './top';

export function Header({
	mobile,
	desktop,
	isSignedIn,
	drawer,
}: {
	mobile: NavItem[];
	desktop: NavDesktopItem[];
	isSignedIn: boolean;
	drawer: DrawerProps;
}) {
	return (
		<>
			<header
				className="o-header"
				data-o-component="o-header"
				data-o-header--no-js>
				<Anon />
				<Top />
				<Search />
				<NavMobile navItems={mobile} />
				<NavDesktop navItems={desktop} isSignedIn={isSignedIn} />
			</header>

			<Drawer {...drawer} />
		</>
	);
}
