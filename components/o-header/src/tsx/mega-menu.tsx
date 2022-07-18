import {NavMobile, NavDesktop} from './nav';
import {Nav} from './Props';

export function MegaMenu({mobile, desktop, isSignedIn}: Nav) {
	return (
		<header
			className="o-header"
			data-o-component="o-header"
			data-o-header--no-js>
			<NavMobile navItems={mobile} />
			<NavDesktop navItems={desktop} isSignedIn={isSignedIn} />
		</header>
	);
}
