import {Drawer} from './drawer';
import {DrawerProps} from './Props';
import { EnhancedSearch } from './search';


export function SimpleHeader({drawer}: {drawer: DrawerProps}) {
	return (
		<>
			<header
				className="o-header o-header--simple"
				data-o-component="o-header"
				data-o-header--no-js>
				<div className="o-header__row o-header__top">
					<div className="o-header__container">
						<div className="o-header__top-wrapper">
							<div className="o-header__top-column o-header__top-column--left">
								<a
									href="#o-header-search"
									className="o-header__top-icon-link o-header__top-icon-link--search"
									aria-controls="o-header-search"
									title="Open search bar">
									<span className="o-header__top-link-label">
										Open search bar
									</span>
								</a>
							</div>

							<div className="o-header__top-column o-header__top-column--center">
								{/* <div className="o-header__top-takeover"></div> */}
								<a
									className="o-header__top-logo"
									href="/"
									title="Go to Financial Times homepage">
									<span className="o-header__visually-hidden">
										Financial Times
									</span>
								</a>
							</div>

							<div className="o-header__top-column o-header__top-column--right">
								{/* <div className="o-header__top-takeover"></div> */}
								<a
									className="o-header__top-icon-link o-header__top-icon-link--hide-s o-header__top-icon-link--myft"
									href="/myft"
									aria-label="My F T">
									<span className="o-header__visually-hidden">myFT</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<EnhancedSearch />
			</header>

			<Drawer {...drawer} />
		</>
	);
}
