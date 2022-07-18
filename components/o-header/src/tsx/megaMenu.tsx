import {NavMobile, NavDesktop} from './header/nav/nav';
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

function HeaderMega({content, index}) {
	return (
		<div
			className="o-header__mega"
			id={'o-header-mega-' + index}
			role="group"
			aria-labelledby={'o-header-link-' + index}
			data-o-header-mega>
			<div className="o-header__container">
				<div className="o-header__mega-wrapper">
					<div className="o-header__mega-column o-header__mega-column--subsections">
						<div className="o-header__mega-heading">Sub-sections</div>
						<div className="o-header__mega-content">
							<SubSection content={content} />
						</div>
					</div>
					<TopStories />
				</div>
			</div>
		</div>
	);
}

function SubSection({content}) {
	return (
		<ul className="o-header__mega-list">
			{content.map(({href, name}) => (
				<li className="o-header__mega-item" key={name}>
					<a className="o-header__mega-link" href={href}>
						{name}
					</a>
				</li>
			))}
		</ul>
	);
}

function TopStories() {
	return (
		<div className="o-header__mega-column o-header__mega-column--articles">
			<div className="o-header__mega-heading">Top Stories</div>
			<div className="o-header__mega-content">
				<ul className="o-header__mega-list">
					<li className="o-header__mega-item">
						<a className="o-header__mega-link" href="#">
							The UK expats voting for Brexit no matter what the cost
						</a>
					</li>
					<li className="o-header__mega-item">
						<a className="o-header__mega-link" href="#">
							Lunch with the FT: Adair Turner
						</a>
					</li>
					<li className="o-header__mega-item">
						<a className="o-header__mega-link" href="#">
							English carpenter who makes beehives that sell across the world
						</a>
					</li>
					<li className="o-header__mega-item">
						<a className="o-header__mega-link" href="#">
							French ambassador urges UK to help shape a &#x2018;reformed
							Europe&#x2019;
						</a>
					</li>
					<li className="o-header__mega-item">
						<a className="o-header__mega-link" href="#">
							Where do politicians live? How MPs across the world find city digs
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
